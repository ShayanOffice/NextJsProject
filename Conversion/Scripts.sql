USE [SAMA2]
GO
    /****** Object:  Table [dbo].[Amaliaats]    Script Date: 4/1/2022 11:26:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO CREATE TABLE [dbo].[Amaliaats](
        [id] [smallint] NOT NULL,
        [Amaliaat] [nvarchar](50) NOT NULL,
        CONSTRAINT [PK_Amaliaats] PRIMARY KEY CLUSTERED ([id] ASC) WITH (
            PAD_INDEX = OFF,
            STATISTICS_NORECOMPUTE = OFF,
            IGNORE_DUP_KEY = OFF,
            ALLOW_ROW_LOCKS = ON,
            ALLOW_PAGE_LOCKS = ON
        ) ON [PRIMARY]
    ) ON [PRIMARY]
GO
insert into Amaliaats
select ROW_NUMBER() OVER (
        Order by Action
    ) AS RowNumber,
    a.*
from (
        select distinct [Action]
        from [dbo].[TblLogInfo]
    ) as A
SELECT [id],
    [Amaliaat]
FROM [SAMA2].[dbo].[Amaliaats] USE [SAMA2]
GO
    /****** Object:  Table [dbo].[LogXactions]    Script Date: 4/1/2022 11:38:10 AM ******/
SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON CREATE TABLE [dbo].[LogXactions](
        [Id] [bigint] IDENTITY(1, 1) NOT NULL,
        [Amal] [tinyint] NOT NULL,
        [KholasseAmaliat] [nvarchar](50) NULL,
        [Tozihaat] [nvarchar](max) NULL,
        [Olaviat] [tinyint] NOT NULL,
        [Natijeh] [nvarchar](50) NULL,
        [LogDateTime] [datetime] NOT NULL,
        [Ip] [nvarchar](50) NOT NULL,
        [FullName] [nvarchar](150) NULL,
        [Username] [nvarchar](50) NULL,
        [Agent] [nvarchar](1000) NULL,
        [ProvinceId] [int] NULL,
        [CityId] [int] NULL,
        [LocationId] [bigint] NULL,
        CONSTRAINT [PK_LogXactions] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
            PAD_INDEX = OFF,
            STATISTICS_NORECOMPUTE = OFF,
            IGNORE_DUP_KEY = OFF,
            ALLOW_ROW_LOCKS = ON,
            ALLOW_PAGE_LOCKS = ON
        ) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[LogXactions]
ADD CONSTRAINT [DF_LogXactions_Olaviat] DEFAULT ((0)) FOR [Olaviat]
GO
    /****** Object:  Table [dbo].[Amaliaats]    Script Date: 4/1/2022 11:44:25 AM ******/
SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON CREATE TABLE [dbo].[NatijehHa](
        [Id] [smallint] NOT NULL,
        [Natijeh] [nvarchar](50) NOT NULL,
        CONSTRAINT [PK_NatijehHa] PRIMARY KEY CLUSTERED ([Id] ASC) WITH (
            PAD_INDEX = OFF,
            STATISTICS_NORECOMPUTE = OFF,
            IGNORE_DUP_KEY = OFF,
            ALLOW_ROW_LOCKS = ON,
            ALLOW_PAGE_LOCKS = ON
        ) ON [PRIMARY]
    ) ON [PRIMARY]
insert into NatijehHa
select ROW_NUMBER() OVER (
        Order by Module
    ) AS RowNumber,
    a.*
from (
        select distinct Module
        from [dbo].[TblLogInfo]
    ) as A
    /*
     SELECT top (21) a.LogInfoId Id
     ,a.Module Amal
     ,A.LogType KholasseAmaliat
     ,A.AdditionalData Tozihaat
     ,a.LogPriority  Olaviat
     ,A.Action  Natijeh
     ,  Agent
     ,  LogDateTime
     ,  Ip
     ,  FullName
     ,  Username
     ,  ProvinceId
     ,a.CountyId  CityId
     ,  LocationId
     FROM [SAMA2].[dbo].[TblLogInfo] A
     --  برای تبدیل --
     SELECT top (21) 
     CONCAT('{id: ', a.LogInfoId
     ,', Amal: ''',a.Module
     ,''', KholasseAmaliat: ',A.LogType 
     ,', Tozihaat: ''',A.AdditionalData 
     ,''', Olaviat: ' ,a.LogPriority  
     ,', Natijeh: ''' ,A.Action  
     ,''', Agent: ''',  Agent
     ,''', LogDateTime: ''',  LogDateTime
     ,''', Ip: ''',  Ip
     ,''', FullName: ''',  FullName
     ,''', Username: ''' ,  Username
     ,''', ProvinceId: '  ,  ISNULL(ProvinceId,0)
     ,', CityId: '  , ISNULL(a.CountyId,0)  
     ,', LocationId: '  ,  LocationId
     ,'},')
     FROM [SAMA2].[dbo].[TblLogInfo] A
     order by 1 desc
     */
    -- conversion of TblLogInfo into LogXactions --
SELECT CONCAT(
        'INSERT INTO LogXactions (LOVOperationsId,LOVResults,UserId,Comment,LogDateTime,Ip,Agent) values(',
        O.Id,
        ',',
        R.Id,
        ',''310773814'',''',
        FullName,
        ''',CAST(N''',
        LogDateTime,
        ''' AS DateTime)',
        ',''',
        Ip,
        ''',''',
        Agent,
        ''');'
    )
FROM TblLogInfo L
    LEFT JOIN LOVOperations O ON L.Action = O.Operation
    LEFT JOIN LOVResults R ON L.Module = R.Result;
-- conversion of filling Memories ----
-- first 2 fk to Computer table are in confilct because computer is empty ---
INSERT INTO SAMA2.dbo.Memories (LOVMemoryId, Count, ComputerId) (
        SELECT M.Id,
            1,
            H.HardwareInfoId
        FROM SAMA2.dbo.TblHardwareInfo H,
            TblValueItem R,
            LOVMemories M
        WHERE H.RamId = R.ValueItemId
            AND R.KeyItemId = 7
            AND R.Name LIKE CONCAT(M.Capacity, '%')
            AND R.Name LIKE CONCAT('%', M.Type)
    ) ---------fill of Computers , step 1------------------
INSERT INTO Computers (OLD_COMPUTERID, UserId)
SELECT x.HardwareInfoId,
    x.NationalCode
FROM TblHardwareInfo x
WHERE x.NationalCode NOT IN (
        SELECT NationalCode
        FROM SAMA2.dbo.TblHardwareInfo t
        WHERE t.NationalCode IS NOT NULL
            AND t.NationalCode NOT IN (
                SELECT Users.Id
                FROM Users
            )
    ) ----setting caseId as property id , step 2 ---------------
UPDATE Computers
SET PropertyCode = (
        SELECT thi.CaseId
        FROM TblHardwareInfo thi
        WHERE OLD_COMPUTERID = thi.HardwareInfoId
    ) ----------------province , step 3--------------------------------
UPDATE Computers
SET ProvinceId = (
        SELECT thi.ProvinceId
        FROM Users thi
        WHERE thi.Id = UserId
    ) ------------------------------------------
    ---- setting LOVDepartmentId of Users
SELECT CONCAT(
        'update Users set LOVDepartmentId=''',
        b.AreaId,
        ''' where Id=''',
        b.NationalCode,
        ''';'
    )
FROM (
        SELECT DISTINCT h.AreaId,
            h.NationalCode
        FROM TblHardwareInfo h
        WHERE h.NationalCode IS NOT NULL
            AND h.AreaId IS NOT NULL
    ) AS b;
---   execute the result of bove query to complete the seeting of dept. id in Users table ----
--- setting cpu id of computers ---
UPDATE Computers
SET LOVCPUId = (
        SELECT h.CpuId
        FROM TblHardwareInfo h
        WHERE h.HardwareInfoId = OLD_COMPUTERID
            AND h.CpuId NOT IN (10109, 10210)
    ) --------------------------------------