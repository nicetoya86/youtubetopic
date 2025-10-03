# 🔄 자동 업데이트 (Vercel Cron Job) 설정 가이드

## ✅ 완료된 작업

- ✅ Cron Job API 라우트 생성 (`/api/cron/update-topics`)
- ✅ vercel.json 설정 완료
- ✅ 매월 1일 오전 2시 자동 실행 스케줄

---

## 🔧 Vercel 환경 변수 설정 (필수)

### 1. CRON_SECRET 생성

랜덤 시크릿 키를 생성합니다:

```bash
# Windows (PowerShell)
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes)
[System.Convert]::ToBase64String($bytes)

# Mac/Linux
openssl rand -base64 32
```

### 2. Vercel 환경 변수 추가

1. **Vercel 대시보드 접속**
   - https://vercel.com/nicetoya86/youtubetopic/settings/environment-variables

2. **CRON_SECRET 추가**
   ```
   Name: CRON_SECRET
   Value: [위에서 생성한 랜덤 키]
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```

3. **Save** 클릭

4. **재배포**
   - Deployments → 최신 배포 → ⋯ → Redeploy

---

## 📅 Cron Job 스케줄

```
"0 2 1 * *"  = 매월 1일 오전 2시 (UTC)
              = 한국 시간 오전 11시
```

### 스케줄 커스터마이징

vercel.json에서 수정 가능:

```json
{
  "crons": [
    {
      "path": "/api/cron/update-topics",
      "schedule": "0 2 1 * *"  // 여기를 수정
    }
  ]
}
```

**예시:**
- 매일 오전 3시: `"0 3 * * *"`
- 매주 월요일 오전 2시: `"0 2 * * 1"`
- 매월 15일 오전 2시: `"0 2 15 * *"`

---

## 🧪 테스트 방법

### 로컬 테스트

```bash
# .env.local에 CRON_SECRET 추가
CRON_SECRET=your-secret-here

# 개발 서버 실행
npm run dev

# Postman 또는 curl로 테스트
curl -X GET http://localhost:3000/api/cron/update-topics \
  -H "Authorization: Bearer your-secret-here"
```

### 프로덕션 테스트

```bash
curl -X GET https://youtubetopic.vercel.app/api/cron/update-topics \
  -H "Authorization: Bearer your-production-secret"
```

**예상 응답:**
```json
{
  "success": true,
  "message": "월간 업데이트 완료",
  "beforeCount": 16,
  "afterCount": 18,
  "addedCount": 2,
  "timestamp": "2025-10-03T..."
}
```

---

## 📊 자동 업데이트 동작 방식

### 1. 매월 1일 실행
- Vercel이 자동으로 `/api/cron/update-topics` 호출

### 2. 작업 내용
- ✅ 3개월 이상 된 주제 비활성화
- ✅ 새로운 트렌드 주제 2개 추가
- ✅ 데이터베이스 업데이트
- ✅ 로그 기록

### 3. 로그 확인
- Vercel 대시보드 → Deployments → Functions
- `/api/cron/update-topics` 로그 확인

---

## 🎯 커스터마이징

### 더 많은 주제 추가하기

`app/api/cron/update-topics/route.ts` 파일의 `generateMonthlyTopics` 함수 수정:

```typescript
function generateMonthlyTopics(month: number) {
  return [
    // 여기에 더 많은 주제 추가
    {
      title: `${month}월 트렌드 숏폼`,
      category: 'entertainment',
      content_type: 'short',
      // ...
    },
    // 추가 주제들...
  ]
}
```

### YouTube API와 연동

실제 YouTube 트렌드를 가져와서 자동으로 추가하도록 개선:

```typescript
// YouTube API 호출 추가
const trendingVideos = await fetchYouTubeTrending()
const newTopics = generateTopicsFromTrending(trendingVideos)
```

---

## ⚠️ 주의사항

1. **CRON_SECRET은 절대 공개하지 마세요!**
   - GitHub에 커밋 금지
   - .env.local 파일만 로컬에 보관

2. **Vercel 무료 플랜 제한**
   - Cron Job: 일일 실행 횟수 제한 있음
   - 자세한 내용: https://vercel.com/docs/cron-jobs

3. **API 호출 비용**
   - YouTube API 할당량 체크
   - Supabase 무료 플랜 한도 확인

---

## 🆘 문제 해결

### Cron이 실행되지 않을 때

1. **CRON_SECRET 확인**
   - Vercel 환경 변수 설정 확인
   - 모든 환경에 추가했는지 확인

2. **vercel.json 확인**
   - 파일이 프로젝트 루트에 있는지 확인
   - JSON 문법 오류 없는지 확인

3. **재배포**
   - vercel.json 변경 후 반드시 재배포 필요

### 로그 확인

- Vercel Dashboard → Functions
- 실행 로그와 에러 메시지 확인

---

## 📝 다음 개선 사항

- [ ] YouTube API 실시간 트렌드 연동
- [ ] 이메일 알림 (업데이트 완료 시)
- [ ] Slack/Discord 웹훅 연동
- [ ] 관리자 대시보드 (수동 실행 버튼)

---

**설정 완료 후 첫 자동 업데이트: 다음 달 1일** 🎉

