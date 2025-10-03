# 🚀 Vercel 배포 가이드

## ✅ Step 1: Git 커밋 완료! 

31개 파일, 10,619줄의 코드가 커밋되었습니다. ✨

---

## 📦 Step 2: GitHub 저장소 생성

### Option A: GitHub 웹사이트에서 생성 (추천)

1. **GitHub 접속**: https://github.com
2. **로그인** 후 오른쪽 상단 **+** 클릭 → **New repository**
3. **Repository 정보 입력**:
   - Repository name: `youtubetopic`
   - Description: `데이터 기반 유튜브 컨텐츠 주제 추천 플랫폼`
   - Public 또는 Private 선택
   - **✅ 체크 해제**: Initialize this repository with a README (이미 로컬에 있음)
4. **Create repository** 클릭

### Option B: GitHub CLI 사용

```bash
# GitHub CLI 설치되어 있다면
gh repo create youtubetopic --public --source=. --remote=origin --push
```

---

## 🔗 Step 3: GitHub에 푸시

GitHub 저장소를 만든 후, 아래 명령어를 실행하세요:

```bash
# 1. GitHub 저장소를 remote로 추가 (YOUR_USERNAME을 본인 계정으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/youtubetopic.git

# 2. 기본 브랜치를 main으로 변경
git branch -M main

# 3. GitHub에 푸시
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/johndoe/youtubetopic.git
git branch -M main
git push -u origin main
```

---

## 🚀 Step 4: Vercel 배포

### 4-1. Vercel 계정 생성 (무료)

1. **Vercel 접속**: https://vercel.com
2. **GitHub 계정으로 로그인/회원가입**
3. GitHub 접근 권한 승인

### 4-2. 프로젝트 Import

1. Vercel 대시보드에서 **Add New... → Project** 클릭
2. **Import Git Repository** 섹션에서 `youtubetopic` 찾기
3. **Import** 클릭

### 4-3. 프로젝트 설정

**Configure Project** 화면에서:

1. **Framework Preset**: Next.js (자동 감지됨)
2. **Root Directory**: `./` (기본값)
3. **Build and Output Settings**: 기본값 유지

### 4-4. 환경 변수 설정 (나중에 추가 가능)

지금은 **건너뛰고** 나중에 추가해도 됩니다.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
YOUTUBE_API_KEY=
```

4. **Deploy** 클릭! 🎉

---

## ⏱️ Step 5: 배포 대기 (2-3분)

Vercel이 자동으로:
- ✅ 코드 빌드
- ✅ 최적화
- ✅ 전 세계 CDN에 배포

**배포 완료 후**:
- 🌐 **Production URL**: `https://youtubetopic.vercel.app`
- 🔗 **커스텀 도메인** 연결 가능 (Settings → Domains)

---

## 🎯 배포 후 확인사항

### ✅ 성공 체크리스트

- [ ] Vercel 대시보드에서 "Ready" 상태 확인
- [ ] Production URL 클릭하여 사이트 접속
- [ ] 랜딩 페이지가 정상적으로 보임
- [ ] 숏폼/롱폼 페이지 이동 가능
- [ ] 반응형 디자인 확인 (모바일/데스크톱)

### 📱 테스트 URL

배포 완료 후 다음 페이지들을 확인하세요:

```
https://youtubetopic.vercel.app/
https://youtubetopic.vercel.app/shorts
https://youtubetopic.vercel.app/long-form
https://youtubetopic.vercel.app/tools
```

---

## 🔧 환경 변수 나중에 추가하기

### Vercel 대시보드에서:

1. 프로젝트 선택 → **Settings** → **Environment Variables**
2. 변수 추가:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `여기에_값_입력`
   - Environments: Production, Preview, Development 모두 체크
3. **Save** 클릭
4. 같은 방식으로 나머지 변수 추가
5. **Deployments** → 최신 배포 → **... (점3개)** → **Redeploy**

---

## 🚨 문제 해결

### 빌드 실패 시

1. Vercel 대시보드 → **Deployments** → 실패한 배포 클릭
2. **Build Logs** 확인
3. 에러 메시지 확인 후 수정
4. 수정 후 다시 푸시:
   ```bash
   git add .
   git commit -m "Fix build error"
   git push
   ```

### GitHub 푸시가 안될 때

```bash
# Personal Access Token 사용
# GitHub → Settings → Developer settings → Personal access tokens
# → Generate new token (classic) → repo 권한 체크
```

---

## 📊 자동 배포 설정 완료!

✅ **이제부터 GitHub에 푸시하면 자동으로 Vercel에 배포됩니다!**

```bash
# 코드 수정 후
git add .
git commit -m "Update features"
git push

# Vercel이 자동으로 빌드 & 배포! 🚀
```

---

## 🎉 다음 단계

1. ✅ **배포 완료** (지금)
2. 📊 **실제 데이터 연동** (Supabase + YouTube API)
3. 🎨 **3D 애니메이션 추가**
4. 🔄 **자동 업데이트 Cron Job**
5. 🌐 **커스텀 도메인 연결**

---

**축하합니다! 🎊 이제 전 세계 어디서나 접속 가능한 웹사이트가 생겼습니다!**

