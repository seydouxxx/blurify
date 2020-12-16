# 기여하기
다양한 종류의 기여를 환영합니다.🎉
- [정규 표현식 추가](https://github.com/seydouxxx/blurify/blob/main/CONTRIBUTING.md#%EC%A0%95%EA%B7%9C-%ED%91%9C%ED%98%84%EC%8B%9D-%EC%B6%94%EA%B0%80)
- [기능 추가](https://github.com/seydouxxx/blurify/blob/main/CONTRIBUTING.md#%EA%B8%B0%EB%8A%A5-%EC%B6%94%EA%B0%80)

## 정규 표현식 추가
- 본 확장 프로그램은 문자열 탐색에 정규 표현식을 사용합니다.
- 필터링 성능 향상을 위해 지속적인 표현식 추가가 필요합니다.

- 등록된 표현식들은 디렉토리 내 [expression.js](https://github.com/seydouxxx/blurify/blob/main/src/expression.js) 파일에 [json](https://www.json.org/json-ko.html) 형식으로 저장되어 있습니다.
  - 정규 표현식만 추가하실 경우, 디렉토리 내 다른 파일들을 수정하실 필요는 없습니다.
  
### 추가 방법
- [expression.js](https://github.com/seydouxxx/blurify/blob/main/src/expression.js) 파일을 읽고 파일의 Key값(타겟)의 Value(표현식) 배열의 원소로 추가합니다.
- 추가하고자 하는 표현식과 동일한 표현식이 이미 등록되어 있지 않은지 먼저 확인해주세요.
- PR 전 충분한 [테스트](https://regexr.com/)를 수행해 주세요.

- Key값을 추가하실 경우 객체의 마지막에 추가해주세요.
- Key값은 확장 프로그램 팝업 상에 직접 보여지므로 줄임말이나 약어는 피하고, 누구나 알 수 있는 단어를 사용해야 합니다.

## 기능 추가
