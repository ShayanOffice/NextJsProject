ALTER TABLE TblHardwareInfo_copy
ADD CONSTRAINT FK_TblHardwareInfo_copy_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES TblProvince (ProvinceId);
ALTER TABLE TblHardwareInfo
ADD CONSTRAINT FK_TblHardwareInfo_TblProvince FOREIGN KEY (ProvinceId) REFERENCES TblProvince (ProvinceId);
ALTER TABLE TblValueItem
ADD CONSTRAINT FK_TblValueItem_TblKeyItem FOREIGN KEY (KeyItemId) REFERENCES TblKeyItem (KeyItemId);
ALTER TABLE TblHardwareInfoSoftware
ADD CONSTRAINT FK_TblHardwareInfoSoftware_TblHardwareInfo FOREIGN KEY (HardwareInfoId) REFERENCES TblHardwareInfo (HardwareInfoId);
ALTER TABLE TblHardwareInfoSoftware
ADD CONSTRAINT FK_TblHardwareInfoSoftware_TblValueItem FOREIGN KEY (ValueItemId) REFERENCES TblValueItem (ValueItemId);
ALTER TABLE TblHardwareInfoNetworkStatus
ADD CONSTRAINT FK_TblHardwareInfoNetworkStatus_TblHardwareInfo FOREIGN KEY (HardwareInfoId) REFERENCES TblHardwareInfo (HardwareInfoId);
ALTER TABLE TblHardwareInfoNetworkStatus
ADD CONSTRAINT FK_TblHardwareInfoNetworkStatus_TblValueItem FOREIGN KEY (ValueItemId) REFERENCES TblValueItem (ValueItemId);
ALTER TABLE TblHardwareInfoDevice
ADD CONSTRAINT FK_TblHardwareInfoDevice_TblHardwareInfo FOREIGN KEY (HardwareInfoId) REFERENCES TblHardwareInfo (HardwareInfoId);
ALTER TABLE TblHardwareInfoDevice
ADD CONSTRAINT FK_TblHardwareInfoDevice_TblValueItem FOREIGN KEY (ValueItemId) REFERENCES TblValueItem (ValueItemId);
ALTER TABLE TblHardwareInfoApplication
ADD CONSTRAINT FK_TblHardwareInfoApplication_TblHardwareInfo FOREIGN KEY (HardwareInfoId) REFERENCES TblHardwareInfo (HardwareInfoId);
ALTER TABLE TblHardwareInfoApplication
ADD CONSTRAINT FK_TblHardwareInfoApplication_TblValueItem FOREIGN KEY (ValueItemId) REFERENCES TblValueItem (ValueItemId);
ALTER TABLE Users
ADD CONSTRAINT FK_User_LOVDepartmentId FOREIGN KEY (LOVDepartmentId) REFERENCES LOVDepartments (Id);
ALTER TABLE Users
ADD CONSTRAINT FK_User_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Users
ADD CONSTRAINT FK_User_UserLevelId FOREIGN KEY (UserLevelId) REFERENCES LOVUserLevels (Id);
ALTER TABLE Telephones
ADD CONSTRAINT FK_Telephones_DepartmentId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE Telephones
ADD CONSTRAINT FK_Telephones_LOVTelephone FOREIGN KEY (LOVTelephone) REFERENCES LOVTelephones (Id);
ALTER TABLE Telephones
ADD CONSTRAINT FK_Telephones_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Telephones
ADD CONSTRAINT FK_Telephones_UserId FOREIGN KEY (UserId) REFERENCES Users (Id);
ALTER TABLE Scanners
ADD CONSTRAINT FK_Scanners_LOVDepartmentsId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE Scanners
ADD CONSTRAINT FK_Scanners_LOVScanner FOREIGN KEY (LOVScannerId) REFERENCES LOVScanners (Id);
ALTER TABLE Scanners
ADD CONSTRAINT FK_Scanners_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Scanners
ADD CONSTRAINT FK_Scanners_UserId FOREIGN KEY (UserId) REFERENCES Users (Id);
ALTER TABLE Printers
ADD CONSTRAINT FK_Printers_LOVDepartmentsId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE Printers
ADD CONSTRAINT FK_Printers_LOVPrinterId FOREIGN KEY (LOVPrinterId) REFERENCES LOVPrinters (Id);
ALTER TABLE Printers
ADD CONSTRAINT FK_Printers_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Printers
ADD CONSTRAINT FK_Printers_UserId FOREIGN KEY (UserId) REFERENCES Users (Id);
ALTER TABLE Monitors
ADD CONSTRAINT FK_Monitors_LOVDepartmentsId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE Monitors
ADD CONSTRAINT FK_Monitors_LOVMonitorId FOREIGN KEY (LOVMonitorId) REFERENCES LOVMonitors (Id);
ALTER TABLE Monitors
ADD CONSTRAINT FK_Monitors_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Monitors
ADD CONSTRAINT FK_Monitors_UserId FOREIGN KEY (UserId) REFERENCES Users (Id);
ALTER TABLE LogXactions
ADD CONSTRAINT FK_LogXactions_LOVDepartmentsId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE LogXactions
ADD CONSTRAINT FK_LogXactions_LOVOperationsId FOREIGN KEY (LOVOperationsId) REFERENCES LOVOperations (Id);
ALTER TABLE LogXactions
ADD CONSTRAINT FK_LogXactions_LOVResults FOREIGN KEY (LOVResults) REFERENCES LOVResults (Id);
ALTER TABLE LogXactions
ADD CONSTRAINT FK_LogXactions_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE LogXactions
ADD CONSTRAINT FK_LogXactions_UserId FOREIGN KEY (UserId) REFERENCES Users (Id);
ALTER TABLE Laptops
ADD CONSTRAINT FK_Laptop_LOVDepartmentsId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE Laptops
ADD CONSTRAINT FK_Laptop_LOVLaptopId FOREIGN KEY (LOVLaptopId) REFERENCES LOVLaptops (Id);
ALTER TABLE Laptops
ADD CONSTRAINT FK_Laptop_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Storages
ADD CONSTRAINT FK_Storages_ComputerId2 FOREIGN KEY (ComputerId) REFERENCES Laptops (Id);
ALTER TABLE Storages
ADD CONSTRAINT FK_Storages_LOVStrorageId FOREIGN KEY (LOVStrorageId) REFERENCES LOVStorages (Id);
ALTER TABLE OSes
ADD CONSTRAINT FK_Oses_ComputerId2 FOREIGN KEY (ComputerId) REFERENCES Laptops (Id);
ALTER TABLE OSes
ADD CONSTRAINT FK_Oses_LOVOsId FOREIGN KEY (LOVOsId) REFERENCES LOVOSes (Id);
ALTER TABLE Memories WITH NOCHECK
ADD CONSTRAINT FK_Memories_ComputerId2 FOREIGN KEY (ComputerId) REFERENCES Laptops (Id);
ALTER TABLE Memories
ADD CONSTRAINT FK_Memories_LOVMemoryId FOREIGN KEY (LOVMemoryId) REFERENCES LOVMemories (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computer_LOVDepartmentsId FOREIGN KEY (LOVDepartmentsId) REFERENCES LOVDepartments (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computer_LOVGPUId FOREIGN KEY (LOVGPUId) REFERENCES LOVGPUs (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computer_LOVPowerId FOREIGN KEY (LOVPowerId) REFERENCES LOVPowers (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computer_ProvinceId FOREIGN KEY (ProvinceId) REFERENCES Provinces (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computer_UserId FOREIGN KEY (UserId) REFERENCES Users (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computers_LOVCPUId FOREIGN KEY (LOVCPUId) REFERENCES LOVCPUs (Id);
ALTER TABLE Computers
ADD CONSTRAINT FK_Computers_LOVMotherBoardId FOREIGN KEY (LOVMotherBoardId) REFERENCES LOVMotherBoards (Id);
ALTER TABLE Connections
ADD CONSTRAINT FK_Connections_LOVConnectionId FOREIGN KEY (LOVConnectionId) REFERENCES LOVConnections (Id);