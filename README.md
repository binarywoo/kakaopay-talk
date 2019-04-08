## 프로젝트 개요

- 카카오페이 경력공채 프론트엔드 개발직군 사전과제
- 결과물 바로가기: https://kakaopay-talk.firebaseapp.com

## 프로젝트 사용법

각 task별 프로젝트 루트에서 아래의 명령어 실행

### 실행

```
npm run start
```

### 테스트

```
npm run test
```

### 빌드

```
npm run build
```

### 배포 (작성자만 가능, firebase CLI 설치되어있어야 함)

```
bash deploy.sh
```

## 프로젝트에 사용된 기술

### 프론트엔드

- [React.js](https://reactjs.org/) 프레임워크 사용 (v.16.8.6)
- [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started)으로 기본 보일러플레이트 구성하여 시작
- [And Design](https://ant.design/)의 UI 컴포넌트 사용
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)로 라우팅 구현
- [Redux](https://lunit.gitbook.io/redux-in-korean/)로 전역 상태관리
- [jest](https://jestjs.io/)와 [Enzyme](https://airbnb.io/enzyme/)으로 테스트코드 작성

### 백엔드

- [Firebase](https://firebase.google.com/?hl=ko)의 실시간 데이터 베이스 및 스토리지 사용

## 페이지 별 주요 기능

### 로그인

- 아이디 입력 후 바로 로그인
- 한 번 입력한 아이디는 브라우저의 로컬스토리지에 저장되며, 로그아웃 하기 전 까지 자동로그인

### 채팅방 목록

- 채팅방 만들기 버튼으로 채팅방 생성 (클릭 시 자동으로 채팅방 제목 입력 폼으로 포커스되어 편의성 극대화)
- 채팅방 목록 아이템에는 아래의 정보들이 표시

```- 채팅방 제목
 - 자신의 참여 여부 상태
 - 마지막 메시지
 - 마지막 업데이트 시간
 - 참여중인 인원
 - 참여중인 사용자 목록
```

- 채팅방 목록은 실시간으로 업데이트

### 채팅방

- 기본적으로 카카오톡을 벤치마킹
- 대화목록을 날짜별로 구분선 표기
- 사용자 참여 및 퇴장 시 메시지 표기
- 메시지의 작성자와 시간(분 단위)이 같을 경우 연속으로 표기 (같은 시간 태그를 공유)
- 상대방의 프로필 사진은 묶인 메시지의 첫 번째 메시지에만 표기
- 뒤로가기(채팅목록으로 가기)와 별개로 채팅방 나가기 버튼이 헤더에 위치함 (나갈경우 퇴장 메시지 표기 및 참여자에서 제외됨)
- 텍스트 인풋 좌측의 + 버튼을 클릭하여 추가 메뉴 노출 (에니메이션 적용)
- 상대방 초대 시 실시간으로 상대방의 화면에 푸시알림이 나타나고 수락 시 채팅방 입장
- 이미지 전송 가능
- 메시지에 URL이 섞여 있을 시, 해당 부분은 링크로 변환
- ~~송금 및 지도는 디자인 상 삽입된 dummy 기능~~

### 헤더

- 로그인 시 로그아웃 버튼과 설정 버튼이 상시 존재
- 채팅방에서는 채팅방 나가기 버튼이 추가됨
- 설정 메뉴에서 채팅방 배경 색설정 가능
- 설정 메뉴에서 프로필사진 설정 가능
- 프로필사진 설정 시 이미지 Crop 기능
- 화면별로 타이틀이 변경됨
- depth가 있는 곳에서는 뒤로가기 버튼 노출

## 프로젝트 설계의 고려사항

### 개발 속도 및 효율성 측면

- 빠른 개발을 위해 이미 많은 컴포넌트가 준비된 Ant Design의 컴포넌트를 UI컴포넌트로 채택
- 빠른 개발을 위해 서버 개발이 필요 없는 Firebase를 데이터베이스 및 스토리지로 채택
- 아래와 같은 기능들을 공통기능으로 분류하여 Higher Order Component로 구현

```
 - firebase 객체를 사용하는 부분 (한 번 생성후 context로 주입, Provider, Consumer 패턴으로 구현)
 - form을 사용하는 부분 (validation을 포함한 input 컴포넌트 구현 용이)
 - Redux store의 데이터와 액션을 Props로 전달 (각 스토어 별로 분리)
 - firebase에서 특정 데이터를 구독
 - 서버를 호출하는 Service 객체를 컴포넌트에 전달
```

### 유지보수 용이성 측면

- 하나의 모듈은 한 종류의 기능에 집중할 수 있도록 구현하여 테스트와 교체가 편리하도록 구현
- 아래와 같은 Layer로 구성

```
-----------------------------------------------
|                UI Component                 |
-----------------------------------------------
|                   View                      |
-----------------------------------------------
|                 Container                   | <->[ HOC ]<->[ Redux Store ]
-----------------------------------------------
|                  Service                    |
-----------------------------------------------
|                    DAO                      |
-----------------------------------------------
|                 Data Base                   |
-----------------------------------------------
```

#### Data Base Layer

- 데이터를 저장하고 파일을 저장하는 계층 (Firebase)

#### DAO Layer

- 데이터베이스에 접근하여 최소 단위의 CRUD 작업 수행

#### Service Layer

- DAO를 통해서 데이터를 CRUD하는 트랜젝션을 수행
- 여러개의 DAO작업이 하나의 function에 묶여있을 수 있음

#### Container Layer

- View에서 필요한 Service들과 Redux store의 reducer 등, 필요한 공통요소들을 HOC를 조합하여 넘겨받음
- View에서 필요한 Service를 호출하고 reducer의 Action을 호출하는 로직이 존재
- View에서 필요한 로직과 전역상태들을 Props로 전달

#### View Layer

- 사용자들에게 직접 보여주는 화면을 렌더링
- 사용자들의 화면에서 일어나는 이벤트들을 전달받아 적절한 기능 수행
- 공통 UI Component들을 가져와 조합하여 화면을 완성

#### UI Component Layer

- View를 구성하는 컴포넌트들의 집합

### 사용자 편의성 및 성능 측면

- 웹과 모바일 화면에서 모두 완벽한 화면을 보여줄 수 있도록 설계
- 각 화면마다 실시간으로 보여줘야 하는 데이터들을 구분하여 화면마다 다르게 데이터를 리스닝
- 리스닝 하던 데이터는 화면 언마운트 시 리스닝을 중단하여 성능저하를 최소화 함
- 카카오톡의 친숙한 UI 차용
- React.js의 최신 기능인 hooks를 적극 활용하여 많은 컴포넌트들을 functional 컴포넌트로 구현함으로써 성능을 극대화함

## 폴더구조

```
- config [웹팩설정]
- public [정적리소스]
- scripts [npm 스크립트]
- src [소스]
 - components [공용컴포넌트]
 - constants [상수]
 - contexts [리액트 컨텍스트]
 - dao [DAO Layer 구현]
 - hoc [Higher Order Components]
 - layouts [레이아웃 컴포넌트]
 - libs [유틸리티]
 - routes [경로별 Container와 View 구현]
 - service [Service Layer 구현]
 - store [Redux 스토어 및 Reducers]
 App.js [최상위 컴포넌트]
 App.less [전역 스타일]
 index.css [보일러플레이트 기본 스타일]
 index.js [전체 최상위 JS파일]
 initialize.js [전역변수 정의 파일]
 serviceWorker.js [서비스워커 사용 시 작성(현재 사용 안함)]
 setupTests.js [Enzyme 사용하기 위한 설정파일]
```
