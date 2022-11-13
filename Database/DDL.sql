drop schema if exists UWC;
create schema UWC;
use UWC;
create table department
(
    id              bigint primary key,
    department_name varchar(255) not null
);

create table "group"
(
    id         bigint primary key,
    group_name varchar(255) not null
);

create type employee_type as enum ('OFFICER', 'COLLECTOR', 'JANITOR');

create table employee
(
    id              bigint primary key,
    email           varchar(255) null,
    first_name      varchar(255) null,
    last_name       varchar(255) null,
    display_name    varchar(255) null,
    group_id        bigint       null references "group" (id),
    department_id   bigint       null references department (id),
    last_login_time timestamp    null,
    is_locked       boolean default false,
    active          boolean default false,
    is_delete       boolean default false,
    employee_type   employee_type
);

CREATE TYPE user_role AS ENUM ('ADMIN', 'OFFICER', 'EMPLOYEE');

create table "user"
(
    id               bigint primary key,
    password_encrypt varchar(1024) not null,
    username         varchar(512)  not null unique,
    employee_id      bigint references employee (id),
    roles            user_role
);

CREATE TYPE vehicle_type AS ENUM ('TRUCK', 'TROLLER');

create table vehicle
(
    id           bigint       not null primary key,
    licence_id   varchar(125) null unique,
    type_vehicle vehicle_type not null,
    capacity     int          null,
    assignee_id  bigint       null,
    foreign key (assignee_id) references employee (id)
);


create table history_assign_vehicle
(
    vehicle_id  bigint not null,
    employee_id bigint not null,
    from_date   timestamp,
    to_date     timestamp,
    primary key (vehicle_id, employee_id),
    foreign key (vehicle_id) references vehicle (id),
    foreign key (employee_id) references employee (id)
);

create type task_status as enum ('UN_ASSIGN', 'ASSIGNED', 'IN_PROCESS', 'DONE');

create table task
(
    id           bigint primary key,
    description  text   null,
    start_time   timestamp,
    end_time     timestamp,
    created_time timestamp,
    updated_time timestamp,
    created_by   bigint,
    task_type    int,
    assignee     bigint null,
    status       task_status,
    foreign key (assignee) references employee (id)
);

create table mcp
(
    id           bigint primary key,
    address      varchar(1024),
    latitude     bigint,
    longitude    bigint,
    capacity     int,
    available    int,
    updated_time timestamp
);

create table task_work_on
(
    task_id bigint,
    mcp_id  bigint,
    primary key (task_id, mcp_id),
    foreign key (task_id) references task (id),
    foreign key (mcp_id) references mcp (id)
);

create table route
(
    id           bigint primary key,
    start_time   timestamp,
    end_time     timestamp,
    collector_id bigint not null,
    foreign key (collector_id) references employee (id)
);

create table task_collector
(
    task_id  bigint primary key,
    route_id bigint not null,
    foreign key (task_id) references task (id),
    foreign key (route_id) references route (id)
);

create table point_route
(
    ordinal_num int    not null,
    route_id    bigint not null,
    mpc_id      bigint not null,
    primary key (ordinal_num, route_id),
    foreign key (mpc_id) references mcp (id)
);

