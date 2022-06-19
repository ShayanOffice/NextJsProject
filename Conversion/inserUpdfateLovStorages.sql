SELECT --Id,Type,Specs,
  CONCAT(
    'insert into LOVStorages (Specs) VALUES (''',
    Id,
    '@',
    SUBSTRING(Specs, CHARINDEX('+', Specs) + 1, 100),
    ''');'
  ) AS x,
  CONCAT(
    'Update LOVStorages set Specs=''',
    SUBSTRING(Specs, 1, CHARINDEX('+', Specs) - 1),
    ''' WHERE Id=',
    Id,
    ';'
  )
FROM SAMA2.dbo.LOVStorages
WHERE Specs LIKE '%+%' -------------------------------------------
UPDATE LOVStorages
SET Specs = TRANSLATE(Specs, '-', '+');
-------------------------------------------
,
CONCAT(
  'INSERT INTO Storages (LOVStrorageId, ComputerId) VALUES(',
  (
    SELECT Id
    FROM LOVStorages
    WHERE Specs LIKE CONCAT(Id, '%')
  ),
  ',',
(
    SELECT ComputerId
    FROM Storages
    WHERE LOVStrorageId = Id
  ),
  ');'
)
insert into LOVStorages (Specs)
VALUES ('10216@ 240GB SSD');
Update LOVStorages
set Specs = '3T '
WHERE Id = 10216;
insert into LOVStorages (Specs)
VALUES ('10220@ 120GB SSD');
Update LOVStorages
set Specs = '500GB '
WHERE Id = 10220;
insert into LOVStorages (Specs)
VALUES ('20301@ 120GB SSD');
Update LOVStorages
set Specs = '1T '
WHERE Id = 20301;
insert into LOVStorages (Specs)
VALUES ('20307@ 240 GB SSD');
Update LOVStorages
set Specs = '1TB '
WHERE Id = 20307;
insert into LOVStorages (Specs)
VALUES ('20308@ 240 G SSD');
Update LOVStorages
set Specs = '2T '
WHERE Id = 20308;
insert into LOVStorages (Specs)
VALUES ('30323@ 120GB SSD');
Update LOVStorages
set Specs = '160GB '
WHERE Id = 30323;
insert into LOVStorages (Specs)
VALUES ('30332@ 240GB SSD');
Update LOVStorages
set Specs = '250GB '
WHERE Id = 30332;
---------------------------------------------------------------
SELECT CONCAT(
    'INSERT INTO Storages (LOVStrorageId, ComputerId) VALUES(',
    A.Id,
    ',',
    B.ComputerId,
    ');'
  )
FROM LOVStorages A,
  Storages B
WHERE A.Specs LIKE '%@%'
  AND B.LOVStrorageId = SUBSTRING(Specs, 1, CHARINDEX('@', Specs) - 1)
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30339, 10072);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30340, 10151);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 10192);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 10198);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30340, 10237);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30339, 10242);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30339, 10254);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 10256);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30338, 10275);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30334, 10278);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 10297);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30340, 10346);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30336, 10426);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 10427);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30334, 10462);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30335, 20483);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30338, 20492);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30336, 30509);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 30556);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30340, 30583);
INSERT INTO Storages (LOVStrorageId, ComputerId)
VALUES(30337, 30586);