import os
import uuid
from fastapi import UploadFile, File

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from passlib.context import CryptContext
from jose import jwt
from authlib.integrations.starlette_client import OAuth

from app.core.config import settings
from app.db.session import get_db
from app.moduels.user import User, RoleEnum
from app.schemas.users_schema import UserRegister, Userlogin, UserOut, Token
from app.dependencies import get_current_user
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(user_id: int, role: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "role": role, "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)



@router.put("/me/profile-image", response_model=UserOut)
async def uplode_profile_image(
    image:UploadFile = File(...),
    current_user:User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
    filename = f"{uuid.uuid4()}_{image.filename}"
    filepath = os.path.join(settings.MEDIA_ROOT, filename)

    with open(filepath, "wb") as f:
        f.write(await image.read())

    current_user.profile_image_url = f"{settings.MEDIA_URL}/{filename}"
    await db.commit()
    await db.refresh(current_user)
    return current_user


@router.post("/register", response_model=UserOut)
async def register(payload: UserRegister, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=RoleEnum.attendee,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/login", response_model=Token)
async def login(payload: Userlogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()

    if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.id, user.role.value)
    return Token(access_token=token)


@router.get("/google/login")
async def google_login(request: Request):
    redirect_uri = settings.GOOGLE_REDIRECT_URL
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google/callback", response_model=Token)
async def google_callback(request: Request, db: AsyncSession = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    userinfo = token["userinfo"]

    result = await db.execute(select(User).where(User.google_id == userinfo["sub"]))
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            name=userinfo["name"],
            email=userinfo["email"],
            google_id=userinfo["sub"],
            role=RoleEnum.attendee,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)

    jwt_token = create_access_token(user.id, user.role.value)
    return Token(access_token=jwt_token)