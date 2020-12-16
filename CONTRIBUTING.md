# 기여하기
모든 기여를 환영합니다.🎉
- [정규 표현식 추가](https://github.com/seydouxxx/blurify/blob/main/CONTRIBUTING.md#%EC%A0%95%EA%B7%9C-%ED%91%9C%ED%98%84%EC%8B%9D-%EC%B6%94%EA%B0%80)
- [기능 추가 / UI 수정](https://github.com/seydouxxx/blurify/blob/main/CONTRIBUTING.md#%EA%B8%B0%EB%8A%A5-%EC%B6%94%EA%B0%80)
- [디렉토리 구조](https://github.com/seydouxxx/blurify/blob/main/CONTRIBUTING.md#%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0)

## 정규 표현식 추가
- 본 확장 프로그램은 문자열 탐색에 [정규 표현식](https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D)을 사용합니다.
- 필터링 성능 향상을 위해 지속적인 표현식 추가가 필요합니다.
- 등록된 표현식들은 디렉토리 내 [expression.js](https://github.com/seydouxxx/blurify/blob/main/src/expression.js) 파일에 [json](https://www.json.org/json-ko.html) 형식으로 저장되어 있습니다.
  - 정규 표현식만 추가하실 경우, 디렉토리 내 다른 파일들을 수정하실 필요는 없습니다.
  
### 추가 방법
- [expression.js](https://github.com/seydouxxx/blurify/blob/main/src/expression.js) 파일을 읽고 파일의 Key값(타겟)의 Value(표현식) 배열의 원소로 추가합니다.
- 추가하고자 하는 표현식과 동일한 표현식이 이미 등록되어 있지 않은지 먼저 확인해주세요.
- Key값을 추가하실 경우 객체의 마지막에 추가해주세요.
- Key값은 확장 프로그램 팝업 상에 직접 보여지므로 줄임말이나 약어는 피하고, 누구나 알 수 있는 단어를 사용해야 합니다.

### 테스트
- PR 전 충분한 [테스트](https://regexr.com/)를 수행해 주세요.
- 배포 단계에서는 문장 단위로 탐색이 이루어지므로 표현식에 ^(시작 문자)나 $(끝 문자)를 사용해서는 안됩니다.

## 기능 추가 / UI 작업
- ❗️[프로젝트 보드](https://github.com/seydouxxx/blurify/projects/1)를 먼저 확인해주세요.
- 추가하고자 하는 기능이 프로젝트 보드의 TODO에 있다면 해당 내용으로 이슈를 생성해주세요.
- 작업 전 [디렉토리 구조](https://github.com/seydouxxx/blurify/blob/main/CONTRIBUTING.md#%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0)를 먼저 확인해주세요.

## 디렉토리 구조
- 루트 디렉토리 내의 [manifest.json](https://github.com/seydouxxx/blurify/blob/main/manifest.json)파일은 구글 확장 프로그램 설정을 저장하는 파일로, 새롭게 추가되는 스크립트 파일은 반드시 manifest 파일에 등록되어 있어야 합니다. 자세한 내용은 [구글 개발자 문서](https://developer.chrome.com/docs/extensions/)를 참조하세요.
- 실제 동작과 관련된 파일들은 [src](https://github.com/seydouxxx/blurify/tree/main/src)파일 내에 저장되어 있습니다.
