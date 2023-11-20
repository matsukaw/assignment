
C:¥Users¥ユーザー名>git -v
git version 2.42.0.windows.2



C:¥Users¥ユーザー名>git config --global user.name "氏名"
C:¥Users¥ユーザー名>git config --global user.email "メールアドレス"



C:¥Users¥ユーザー名>git config user.name 
[氏名]
C:¥Users¥ユーザー名>git config user.email 
[メールアドレス]


C:¥Users¥ユーザー名>mkdir ディレクトリ名
C:¥Users¥ユーザー名>㏅ ディレクトリ名
C:¥Users¥ユーザー名>ディレクトリ名¥git init 
 


C:¥Users¥ユーザー名¥ディレクトリ名>git clone git@github.com:アカウント名/リポジトリ名.git



C:¥Users¥ユーザー名¥ディレクトリ名>git remote -v 
origin http://github.com/アカウント名/リポジトリ名.git (fetch)
origin http://github.com/アカウント名/リポジトリ名.git (push)











$ ssh-keygen -t rsa -b 2048 -c "メールアドレス"

  

$eval "$(ssh-agent -s)"
Agent pid 　　　　　　　




$ssh-add ~/.ssh/id_rsa
Identity added: /c/Users/ユーザー名/.ssh/id_rsa (azured\ユーザー名@　　　　　　　　　)




$ssh-add -l
3072 SHA256:　　　　　　　　　　　　　　　　　　　　　　　　　　(RSA)





$cat ~/.ssh/id_rsa.pub | clip






































