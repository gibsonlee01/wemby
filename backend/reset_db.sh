# 초기화 스크립트 예시 (reset_db.sh)
#!/bin/bash
python /app/backend/project/manage.py flush --no-input

# 사진파일 삭제
rm -rf /app/backend/project/media/profile_pictures/*
