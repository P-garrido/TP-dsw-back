create database TPdsw;
create table productos (
  id_producto int(8) auto_increment primary key,
  nombre_producto varchar(50) not null,
  desc_producto varchar(30) unique not null,
  stock int(8) not null,
  id_categoria int(8),
  precio decimal(9, 3) not null,
  imagen text null
);
create table usuarios (
  id_usuario int(8) auto_increment primary key,
  nombre_usuario varchar(30) unique not null,
  clave varchar(30) not null,
  email varchar(50) not null,
  telefono varchar(20) not null,
  nombre varchar(20) not null,
  apellido varchar(20) not null,
  direccion varchar(50) null,
  tipo_usuario int(1) not null
);
create table pedidos (
  id_pedido int(8) auto_increment primary key,
  fecha datetime not null,
  id_cliente int(8),
  total float null,
  foreign key(id_cliente) references usuarios(id_usuario)
);
drop table productos_pedidos;
create table productos_pedidos (
  id_pedido int(8),
  id_producto int(8),
  cantidad int(8) not null,
  primary key(id_pedido, id_producto),
  foreign key(id_pedido) references pedidos(id_pedido),
  foreign key(id_producto) references productos(id_producto)
);
create table servicios (
  id_servicio int(8) auto_increment primary key,
  desc_servicio varchar(30) unique not null,
  precio_por_hora decimal(9, 3) not null,
  descripcion varchar(255)
);
create table clientes_servicios (
  id_servicio int(8),
  id_usuario int(8),
  fecha_servicio datetime,
  cant_horas int(5) null,
  mensaje_cliente varchar(255) null,
  primary key(id_servicio, id_usuario, fecha_servicio),
  CONSTRAINT fk_servicio FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio),
  CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
create table sucursales (
  id_sucursal int auto_increment primary key,
  nombre varchar(30) unique not null,
  direccion varchar(30) unique not null
);
-- usuario de tipo empleado/administrador para crear desde la base de datos
-- nombre de usuario y contraseña: 'admin'
insert into usuarios
values (
    default,
    'admin',
    'admin',
    'admin@gmail.com',
    '00000000',
    'Administrador',
    'Administrador',
    'Calle 123',
    1
  );