#### creat table
CREATE TABLE IF NOT EXISTS `runoob_tbl`(
   `runoob_id` INT UNSIGNED AUTO_INCREMENT,
   `runoob_title` VARCHAR(100) NOT NULL,
   `runoob_author` VARCHAR(40) NOT NULL,
   `submission_date` DATE,
   PRIMARY KEY ( `runoob_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#### ~/.bash_profile
```bash
    PATH=$PATH:/usr/local/mysql/bin  
    source  ~/.bash_profile
```

update user set Password=OLD_PASSWORD('password') WHERE User='username';
update user set authentication_string=OLD_PASSWORD('password') WHERE User='username';
update user set authentication_string=password(''), plugin='mysql_native_password' where user='root';
https://dev.mysql.com/doc/refman/5.5/en/old-client.html
