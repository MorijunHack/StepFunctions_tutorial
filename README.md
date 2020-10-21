# StepFunctions_tutprial
StepFunctionsのチュートリアル用で作成しました。記事とともにご覧ください。

## ざっくりアーキテクチャ
* src    　：　Lambdaのソースコードを格納
* tasks  　：　Typescriptで書かれたLambdaのソースコードをJavascriptにコンパイルして.distディレクトリにアウトプットするコマンドを格納
* webpack.config.js  ：　webpackによってモジュールごと１ファイルにまとめるためのコードを格納

* aws-cdk　：　全体をCDKデプロイするためのモジュールを格納
    * bin　：　デプロイするCDKコードのエントリ
    * lib　：　詳細なCDKコードを格納したディレクトリ
