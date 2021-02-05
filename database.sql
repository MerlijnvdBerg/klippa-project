create or replace table folder
(
	id int auto_increment
		primary key,
	name varchar(45) not null,
	date datetime default current_timestamp() null
);

create or replace table images
(
	id int auto_increment
		primary key,
	filename varchar(135) not null,
	receipt_id int not null,
	date datetime default current_timestamp() null
);

create or replace table receipt
(
	id int auto_increment
		primary key,
	name varchar(45) not null,
	amount decimal(9,2) null,
	folder_id int null,
	date datetime default current_timestamp() null
);
