import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, updateAccessToken } from './userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SqlUrl + 'api/' /* defined in next.config.js */,
  //process.env.NODE_ENV === 'production' ? `http://localhost:5000/`, : 'http://w.x.y.z:5000/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const {
      userReducer: { auth },
    } = getState();
    if (auth.accessToken) {
      headers.set('authorization', `Bearer ${auth.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions, getState) => {
  let result = await baseQuery(args, api, extraOptions);
  // const State = getState();
  const refreshToken = api.getState().userReducer.auth.refreshToken;
  // if (result.error) console.warn('We Have Error', result.error);
  if (result.error && result.error.originalStatus === 403) {
    // console.warn(
    //   '************************Got Forbidden************************',
    //   refreshToken
    // );

    const refreshResult = await baseQuery(
      {
        url: '/users/token/',
        method: 'POST',
        body: {
          token: refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      await api.dispatch(
        updateAccessToken({ accessToken: refreshResult.data })
      );
      //   'new access tkn',
      //   api.getState().userReducer.auth.accessToken
      // );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      await api.dispatch(logout());
    }
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const SamaApi = createApi({
  reducerPath: 'SamaApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'App',
    'Computer',
    'Connection',
    'CPU',
    'Department',
    'GPU',
    'Laptop',
    'Log',
    'Memory',
    'Monitor',
    'Motherboard',
    'Operation',
    'OS',
    'Paging',
    'Power',
    'Printer',
    'Provinces',
    'Scanner',
    'Software',
    'Storage',
    'Telephone',
    'ULevel',
    'Users',
  ],

  endpoints: (builder) => ({
    //    getXyz: builder.query({ query: (qry) => ({ url: `Certificate...?`,}), providesTags: ['Certificates'], }),
    //    xyz: builder.mutation({ query: (body) => ({ url: `Invitation-SetStatus`, method: 'POST', body, }), invalidatesTags: ['Certificates'],}),

    // ---------- App APIs ----------
    getLOVApps: builder.query({
      query: () => ({ url: `lov/apps`, method: 'get' }),
      providesTags: ['App'],
    }),
    addApp: builder.mutation({
      query: (body) => ({ url: `lov/apps`, method: 'POST', body }),
      invalidatesTags: ['App'],
    }),
    edtApp: builder.mutation({
      query: (body) => ({ url: `lov/apps/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['App'],
    }),
    rmvApp: builder.mutation({
      query: (body) => ({ url: `lov/apps/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['App'],
    }),
    // ^^^^^^^^^^ App APIs ^^^^^^^^^^

    // ---------- Computer APIs ----------
    getAllComputers: builder.mutation({
      query: () => ({ url: `computers`, method: 'get' }),
    }),
    getComputers: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `computers/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'get',
      }),
      providesTags: ['Computer'],
    }),
    addComputer: builder.mutation({
      query: (body) => ({ url: `computers`, method: 'POST', body }),
      invalidatesTags: ['Computer'],
    }),
    edtComputer: builder.mutation({
      query: (body) => ({ url: `computers/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Computer'],
    }),
    rmvComputer: builder.mutation({
      query: (body) => ({
        url: `computers/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Computer'],
    }),
    // ^^^^^^^^^^ Computer APIs ^^^^^^^^^^

    // ---------- Connection APIs ----------
    getLOVConnections: builder.query({
      query: () => ({ url: `lov/connections`, method: 'get' }),
      providesTags: ['Connection'],
    }),
    addConnection: builder.mutation({
      query: (body) => ({ url: `lov/connections`, method: 'POST', body }),
      invalidatesTags: ['Connection'],
    }),
    edtConnection: builder.mutation({
      query: (body) => ({
        url: `lov/connections/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Connection'],
    }),
    rmvConnection: builder.mutation({
      query: (body) => ({
        url: `lov/connections/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Connection'],
    }),
    // ^^^^^^^^^^ Connection APIs ^^^^^^^^^^

    //  ---------- CPU APIs----------
    getLOVCPUs: builder.query({
      query: () => ({ url: `lov/cpus`, method: 'get' }),
      providesTags: ['CPU'],
    }),
    addCPU: builder.mutation({
      query: (body) => ({ url: `lov/cpus`, method: 'POST', body }),
      invalidatesTags: ['CPU'],
    }),
    edtCPU: builder.mutation({
      query: (body) => ({ url: `lov/cpus/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['CPU'],
    }),
    rmvCPU: builder.mutation({
      query: (body) => ({ url: `lov/cpus/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['CPU'],
    }),
    // ^^^^^^^^^^ CPU APIs ^^^^^^^^^^

    // ---------- Department APIs ----------
    getLOVDepartments: builder.query({
      query: () => ({ url: `lov/departments`, method: 'get' }),
      providesTags: ['Department'],
    }),
    addDepartment: builder.mutation({
      query: (body) => ({ url: `lov/departments`, method: 'POST', body }),
      invalidatesTags: ['Department'],
    }),
    edtDepartment: builder.mutation({
      query: (body) => ({
        url: `lov/departments/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Department'],
    }),
    rmvDepartment: builder.mutation({
      query: (body) => ({
        url: `lov/departments/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Department'],
    }),
    // ^^^^^^^^^^ Department APIs ^^^^^^^^^^

    // ---------- Filter APIs ----------
    cleanFilter: builder.mutation({
      query: () => ({ url: `filters`, method: 'get' }),
      invalidatesTags: [
        'App',
        'Computer',
        'Connection',
        'CPU',
        'Department',
        'GPU',
        'Laptop',
        'Log',
        'Memory',
        'Monitor',
        'Motherboard',
        'Operation',
        'OS',
        'Paging',
        'Power',
        'Printer',
        'Provinces',
        'Scanner',
        'Software',
        'Storage',
        'Telephone',
        'ULevel',
        'Users',
      ],
    }),
    postNewFilter: builder.mutation({
      query: (body) => ({ url: `filters`, method: 'post', body }),
      invalidatesTags: [
        'App',
        'Computer',
        'Connection',
        'CPU',
        'Department',
        'GPU',
        'Laptop',
        'Log',
        'Memory',
        'Monitor',
        'Motherboard',
        'Operation',
        'OS',
        'Power',
        'Printer',
        'Provinces',
        'Scanner',
        'Software',
        'Storage',
        'Telephone',
        'ULevel',
        'Users',
      ],
    }),
    // ^^^^^^^^^^ Filter APIs ^^^^^^^^^^


    // ---------- GPU APIs ----------
    getLOVGPUs: builder.query({
      query: () => ({ url: `lov/gpus`, method: 'get' }),
      providesTags: ['GPU'],
    }),
    addGPU: builder.mutation({
      query: (body) => ({ url: `lov/gpus`, method: 'POST', body }),
      invalidatesTags: ['GPU'],
    }),
    edtGPU: builder.mutation({
      query: (body) => ({ url: `lov/gpus/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['GPU'],
    }),
    rmvGPU: builder.mutation({
      query: (body) => ({ url: `lov/gpus/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['GPU'],
    }),
    // ^^^^^^^^^^ GPU APIs ^^^^^^^^^^

    // ---------- Laptop APIs ----------
    getLOVLaptops: builder.query({
      query: () => ({ url: `lov/laptops`, method: 'get' }),
      providesTags: ['Laptop'],
    }),
    addLaptop: builder.mutation({
      query: (body) => ({ url: `lov/laptops`, method: 'POST', body }),
      invalidatesTags: ['Laptop'],
    }),
    edtLaptop: builder.mutation({
      query: (body) => ({
        url: `lov/laptops/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Laptop'],
    }),
    rmvLaptop: builder.mutation({
      query: (body) => ({
        url: `lov/laptops/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Laptop'],
    }),
    // ^^^^^^^^^^ Laptop APIs ^^^^^^^^^^

    // ---------- Log of activities APIs ----------
    getAllLog: builder.mutation({
      query: () => ({ url: `logs`, method: 'GET' }),
    }),

    getLog: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `logs/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'GET',
      }),
      providesTags: ['Log'],
    }),
    // ^^^^^^^^^^ Log of activities APIs ^^^^^^^^^^

    // ---------- Memory APIs ----------
    getLOVMemories: builder.query({
      query: () => ({ url: `lov/memories`, method: 'get' }),
      providesTags: ['Memory'],
    }),
    addMemory: builder.mutation({
      query: (body) => ({ url: `lov/memories`, method: 'POST', body }),
      invalidatesTags: ['Memory'],
    }),
    edtMemory: builder.mutation({
      query: (body) => ({
        url: `lov/memories/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Memory'],
    }),
    rmvMemory: builder.mutation({
      query: (body) => ({
        url: `lov/memories/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Memory'],
    }),
    // ^^^^^^^^^^ Memory APIs ^^^^^^^^^^

    // ---------- Monitor APIs ----------
    getLOVMonitors: builder.query({
      query: () => ({ url: `lov/monitors`, method: 'get' }),
      providesTags: ['Monitor'],
    }),
    addLOVMonitor: builder.mutation({
      query: (body) => ({ url: `lov/monitors`, method: 'POST', body }),
      invalidatesTags: ['Monitor'],
    }),
    edtLOVMonitor: builder.mutation({
      query: (body) => ({
        url: `lov/monitors/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Monitor'],
    }),
    rmvLOVMonitor: builder.mutation({
      query: (body) => ({
        url: `lov/monitors/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Monitor'],
    }),

    // // // // // // // // // // // // \\ \\ \\ \\ \\ \\ \\ \\ \\ \\
    getLOVMonitors: builder.query({
      query: () => ({ url: `lov/monitors`, method: 'get' }),
      providesTags: ['Monitor'],
    }),
    addLOVMonitor: builder.mutation({
      query: (body) => ({ url: `lov/monitors`, method: 'POST', body }),
      invalidatesTags: ['Monitor'],
    }),
    edtLOVMonitor: builder.mutation({
      query: (body) => ({
        url: `lov/monitors/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Monitor'],
    }),
    rmvLOVMonitor: builder.mutation({
      query: (body) => ({
        url: `lov/monitors/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Monitor'],
    }),
    // // // // // // // // // // // // \\ \\ \\ \\ \\ \\ \\ \\ \\ \\
    getAllMonitors: builder.mutation({
      query: () => ({ url: `monitors/`, method: 'get' }),
    }),
    getMonitors: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `monitors/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'get',
      }),
      providesTags: ['Monitor'],
    }),
    addMonitor: builder.mutation({
      query: (body) => ({ url: `monitors`, method: 'POST', body }),
      invalidatesTags: ['Monitor'],
    }),
    edtMonitor: builder.mutation({
      query: (body) => ({ url: `monitors/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Monitor'],
    }),
    rmvMonitor: builder.mutation({
      query: (body) => ({ url: `monitors/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['Monitor'],
    }),
    // ^^^^^^^^^^ Monitor APIs ^^^^^^^^^^

    // ---------- MotherBoard APIs ----------
    getLOVMotherBoards: builder.query({
      query: () => ({ url: `lov/motherboards`, method: 'get' }),
      providesTags: ['Motherboard'],
    }),
    addMotherbord: builder.mutation({
      query: (body) => ({ url: `lov/motherboards`, method: 'POST', body }),
      invalidatesTags: ['Motherboard'],
    }),
    edtMotherbord: builder.mutation({
      query: (body) => ({
        url: `lov/motherboards/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Motherboard'],
    }),
    rmvMotherbord: builder.mutation({
      query: (body) => ({
        url: `lov/motherboards${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Motherboard'],
    }),
    // ^^^^^^^^^^ MotherBoard APIs ^^^^^^^^^^

    // ---------- Operation APIs ----------
    getLOVOperations: builder.query({
      query: () => ({ url: `lov/operations`, method: 'get' }),
      providesTags: ['Operation'],
    }),
    addOperation: builder.mutation({
      query: (body) => ({ url: `lov/operations`, method: 'POST', body }),
      invalidatesTags: ['Operation'],
    }),
    edtOperation: builder.mutation({
      query: (body) => ({
        url: `lov/operations${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Operation'],
    }),
    rmvOperation: builder.mutation({
      query: (body) => ({
        url: `lov/operations${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Operation'],
    }),
    // ^^^^^^^^^^ Operation APIs ^^^^^^^^^^

    // ---------- OS APIs ----------
    getLOVOSes: builder.query({
      query: () => ({ url: `lov/oses`, method: 'get' }),
      providesTags: ['OS'],
    }),
    addOS: builder.mutation({
      query: (body) => ({ url: `lov/oses`, method: 'POST', body }),
      invalidatesTags: ['OS'],
    }),
    edtOS: builder.mutation({
      query: (body) => ({ url: `lov/oses/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['OS'],
    }),
    rmvOS: builder.mutation({
      query: (body) => ({ url: `lov/oses/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['OS'],
    }),
    // ^^^^^^^^^^ OS APIs ^^^^^^^^^^

    // ---------- Power APIs ----------
    getLOVPowers: builder.query({
      query: () => ({ url: `lov/powers`, method: 'get' }),
      providesTags: ['Power'],
    }),
    addPower: builder.mutation({
      query: (body) => ({ url: `lov/powers`, method: 'POST', body }),
      invalidatesTags: ['Power'],
    }),
    edtPower: builder.mutation({
      query: (body) => ({ url: `lov/powers/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Power'],
    }),
    rmvPower: builder.mutation({
      query: (body) => ({
        url: `lov/powers/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Power'],
    }),
    // ^^^^^^^^^^ Power APIs ^^^^^^^^^^

    // ---------- Printer APIs ----------
    getLOVPrinters: builder.query({
      query: () => ({ url: `lov/printers`, method: 'get' }),
      providesTags: ['Printer'],
    }),
    addLOVPrinter: builder.mutation({
      query: (body) => ({ url: `lov/printers`, method: 'POST', body }),
      invalidatesTags: ['Printer'],
    }),
    edtLOVPrinter: builder.mutation({
      query: (body) => ({
        url: `lov/printers/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Printer'],
    }),
    rmvLOVPrinter: builder.mutation({
      query: (body) => ({
        url: `lov/printers/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Printer'],
    }),
    // // // // // // // // // // // // \\ \\ \\ \\ \\ \\ \\ \\ \\ \\
    getAllPrinters: builder.mutation({
      query: () => ({ url: `printers`, method: 'GET' }),
    }),
    getPrinters: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `printers/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'GET',
      }),
      providesTags: ['Printer'],
    }),
    addPrinter: builder.mutation({
      query: (body) => ({ url: `printers`, method: 'POST', body }),
      invalidatesTags: ['Printer'],
    }),
    edtPrinter: builder.mutation({
      query: (body) => ({ url: `printers/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Printer'],
    }),
    rmvPrinter: builder.mutation({
      query: (body) => ({ url: `printers/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['Printer'],
    }),
    // ^^^^^^^^^^ Printer APIs ^^^^^^^^^^

    // ---------- Province APIs ----------
    getProvinces: builder.query({
      query: () => ({ url: `provinces`, method: 'get' }),
      providesTags: ['Provinces'],
    }),
    addProvince: builder.mutation({
      query: (body) => ({ url: `provinces`, method: 'POST', body }),
      invalidatesTags: ['Provinces'],
    }),
    edtProvince: builder.mutation({
      query: (body) => ({ url: `provinces/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Provinces'],
    }),
    rmvProvince: builder.mutation({
      query: (body) => ({
        url: `provinces/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Provinces'],
    }),
    // ^^^^^^^^^^ Province APIs ^^^^^^^^^^

    // ---------- Scanner APIs ----------
    getLOVScanners: builder.query({
      query: () => ({ url: `lov/scanners`, method: 'GET' }),
      providesTags: ['Scanner'],
    }),
    addLOVScanner: builder.mutation({
      query: (body) => ({ url: `lov/scanners`, method: 'POST', body }),
      invalidatesTags: ['Scanner'],
    }),
    edtLOVScanner: builder.mutation({
      query: (body) => ({
        url: `lov/scanners/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Scanner'],
    }),
    rmvLOVScanner: builder.mutation({
      query: (body) => ({
        url: `lov/scanners/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Scanner'],
    }),
    // // // // // // // // // // // // \\ \\ \\ \\ \\ \\ \\ \\ \\ \\
    getAllScanners: builder.mutation({
      query: () => ({ url: `scanners`, method: 'GET' }),
    }),
    getScanners: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `scanners/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'GET',
      }),
      providesTags: ['Scanner'],
    }),
    addScanner: builder.mutation({
      query: (body) => ({ url: `scanners`, method: 'POST', body }),
      invalidatesTags: ['Scanner'],
    }),
    edtScanner: builder.mutation({
      query: (body) => ({ url: `scanners/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Scanner'],
    }),
    rmvScanner: builder.mutation({
      query: (body) => ({ url: `scanners/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['Scanner'],
    }),
    // ^^^^^^^^^^ Scanner APIs ^^^^^^^^^^

    // ---------- Software APIs ----------
    getLOVSoftwares: builder.query({
      query: () => ({ url: `lov/softwares`, method: 'GET' }),
      providesTags: ['Software'],
    }),
    addSoftware: builder.mutation({
      query: (body) => ({ url: `lov/softwares`, method: 'POST', body }),
      invalidatesTags: ['Software'],
    }),
    edtSoftware: builder.mutation({
      query: (body) => ({
        url: `lov/softwares/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Software'],
    }),
    rmvSoftware: builder.mutation({
      query: (body) => ({
        url: `lov/softwares/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Software'],
    }),
    // ^^^^^^^^^^ Software APIs ^^^^^^^^^^
    // ---------- Sort APIs ----------
    clearSort: builder.mutation({
      query: () => ({ url: `sort`, method: 'get' }),
      invalidatesTags: [
        'App',
        'Computer',
        'Connection',
        'CPU',
        'Department',
        'GPU',
        'Laptop',
        'Log',
        'Memory',
        'Monitor',
        'Motherboard',
        'Operation',
        'OS',
        'Power',
        'Printer',
        'Provinces',
        'Scanner',
        'Software',
        'Storage',
        'Telephone',
        'ULevel',
        'Users',
      ],
    }),
    postSort: builder.mutation({
      query: (body) => ({ url: `sort`, method: 'post', body }),
      invalidatesTags: [
        'App',
        'Computer',
        'Connection',
        'CPU',
        'Department',
        'GPU',
        'Laptop',
        'Log',
        'Memory',
        'Monitor',
        'Motherboard',
        'Operation',
        'OS',
        'Power',
        'Printer',
        'Provinces',
        'Scanner',
        'Software',
        'Storage',
        'Telephone',
        'ULevel',
        'Users',
      ],
    }),
    // ^^^^^^^^^^ Sort APIs ^^^^^^^^^^
    // ---------- Storage APIs ----------
    getLOVStorages: builder.query({
      query: () => ({ url: `lov/storages`, method: 'GET' }),
      providesTags: ['Storage'],
    }),
    addStorage: builder.mutation({
      query: (body) => ({ url: `lov/storages`, method: 'POST', body }),
      invalidatesTags: ['Storage'],
    }),
    edtStorage: builder.mutation({
      query: (body) => ({
        url: `lov/storages/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Storage'],
    }),
    rmvStorage: builder.mutation({
      query: (body) => ({
        url: `lov/storages/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Storage'],
    }),
    // ^^^^^^^^^^ Storage APIs ^^^^^^^^^^

    // ---------- Telphone APIs ----------
    getLOVTelephones: builder.query({
      query: () => ({ url: `lov/telephones`, method: 'GET' }),
      providesTags: ['Telephone'],
    }),
    addLOVTelephone: builder.mutation({
      query: (body) => ({ url: `lov/telephones`, method: 'POST', body }),
      invalidatesTags: ['Telephone'],
    }),
    edtLOVTelephone: builder.mutation({
      query: (body) => ({
        url: `lov/telephones/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Telephone'],
    }),
    rmvLOVTelephone: builder.mutation({
      query: (body) => ({
        url: `lov/telephones/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Telephone'],
    }),
    //----------------------------\\
    getAllTelephones: builder.mutation({
      query: () => ({ url: `telephones`, method: 'GET' }),
    }),
    getTelephones: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `telephones/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'GET',
      }),
      providesTags: ['Telephone'],
    }),
    addTelephone: builder.mutation({
      query: (body) => ({ url: `telephones`, method: 'POST', body }),
      invalidatesTags: ['Telephone'],
    }),
    edtTelephone: builder.mutation({
      query: (body) => ({ url: `telephones/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Telephone'],
    }),
    rmvTelephone: builder.mutation({
      query: (body) => ({
        url: `telephones/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Telephone'],
    }),
    // ^^^^^^^^^^ Telphone APIs ^^^^^^^^^^

    // ---------- Userlevel APIs ----------
    getLOVUserLevels: builder.query({
      query: () => ({ url: `lov/userlevels`, method: 'GET' }),
      providesTags: ['ULevel'],
    }),
    addUserLevel: builder.mutation({
      query: (body) => ({ url: `lov/userlevels`, method: 'POST', body }),
      invalidatesTags: ['ULevel'],
    }),
    edtUserLevel: builder.mutation({
      query: (body) => ({
        url: `lov/userlevels/${body.Id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ULevel'],
    }),
    rmvUserLevel: builder.mutation({
      query: (body) => ({
        url: `lov/userlevels/${body.Id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['ULevel'],
    }),
    // ^^^^^^^^^^ Userlevel APIs ^^^^^^^^^^

    // ---------- Users APIs ----------
    getUsers: builder.query({
      query: ({ itemsPerPage, pageNum }) => ({
        url: `users/pageItems:${itemsPerPage}&pageNum:${pageNum}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    getAllUsers: builder.query({
      query: () => ({ url: `users/all`, method: 'GET' }),
      providesTags: ['Users'],
    }),
    loginUser: builder.mutation({
      query: (body) => ({ url: `users/login`, method: 'POST', body }),
      invalidatesTags: [
        'App',
        'Computer',
        'Connection',
        'CPU',
        'Department',
        'GPU',
        'Laptop',
        'Log',
        'Memory',
        'Monitor',
        'Motherboard',
        'Operation',
        'OS',
        'Power',
        'Printer',
        'Provinces',
        'Scanner',
        'Software',
        'Storage',
        'Telephone',
        'ULevel',
        'Users',
      ],
    }),
    logoutUser: builder.mutation({
      query: (body) => ({ url: `users/logout/`, method: 'DELETE' }),
    }),
    getUserProfile: builder.query({
      query: () => ({ url: `users/profile`, method: 'GET' }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: `users`, method: 'POST', body }),
      invalidatesTags: ['Users'],
    }),
    edtUser: builder.mutation({
      query: (body) => ({ url: `users/${body.Id}`, method: 'POST', body }),
      invalidatesTags: ['Users'],
    }),
    chngUsrPswrd: builder.mutation({
      query: (body) => ({
        url: `users/${body.Id}/updatePassword`,
        method: 'POST',
        body,
      }),
    }),
    rmvUser: builder.mutation({
      query: (body) => ({ url: `users/${body.Id}`, method: 'DELETE', body }),
      invalidatesTags: ['Users'],
    }),
    // ^^^^^^^^^^ User APIs ^^^^^^^^^^
  }),
});

export const {
  // hooks for usage in functional components

  // --- Laptop api hooks ---
  useGetLOVAppsQuery,
  useAddAppMutation,
  useEdtAppMutation,
  useRmvAppMutation,

  // --- Computer api hooks ---
  useGetAllComputersMutation,
  useGetComputersQuery,
  useAddComputerMutation,
  useEdtComputerMutation,
  useRmvComputerMutation,

  // --- Connection api hooks ---
  useGetLOVConnectionsQuery,
  useAddConnectionMutation,
  useEdtConnectionMutation,
  useRmvConnectionMutation,

  // --- CPU api hooks ---
  useGetLOVCPUsQuery,
  useAddCPUMutation,
  useEdtCPUMutation,
  useRmvCPUMutation,

  // --- Department api hooks ---
  useGetLOVDepartmentsQuery,
  useAddDepartmentMutation,
  useEdtDepartmentMutation,
  useRmvDepartmentMutation,

  // --- Filter api hooks ---
  useCleanFilterMutation,
  usePostNewFilterMutation,

  // --- Paging api hooks ---
  
  

  // --- GPU api hooks ---
  useGetLOVGPUsQuery,
  useAddGPUMutation,
  useEdtGPUMutation,
  useRmvGPUMutation,

  // --- Laptop api hooks ---
  useGetLOVLaptopsQuery,
  useAddLaptopMutation,
  useEdtLaptopMutation,
  useRmvLaptopMutation,

  // --- Log api hooks ---
  useGetAllLogMutation,
  useGetLogQuery,

  // --- Memory api hooks ---
  useGetLOVMemoriesQuery,
  useAddMemoryMutation,
  useEdtMemoryMutation,
  useRmvMemoryMutation,

  // --- Monitor api hooks ---
  useGetLOVMonitorsQuery,
  useAddLOVMonitorMutation,
  useEdtLOVMonitorMutation,
  useRmvLOVMonitorMutation,
  //\\//\\//\\//\\//\\//\\//\\
  useGetAllMonitorsMutation,
  useGetMonitorsQuery,
  useAddMonitorMutation,
  useEdtMonitorMutation,
  useRmvMonitorMutation,
  // --- Motherboard api hooks ---
  useGetLOVMotherBoardsQuery,
  useAddMotherbordMutation,
  useEdtMotherbordMutation,
  useRmvMotherbordMutation,

  // --- Power api hooks ---
  useGetLOVOperationsQuery,
  useAddOperationMutation,
  useEdtOperationMutation,
  useRmvOperationMutation,

  // --- Os api hooks ---
  useGetLOVOSesQuery,
  useAddOSMutation,
  useEdtOSMutation,
  useRmvOSMutation,

  // --- Power api hooks ---
  useGetLOVPowersQuery,
  useAddPowerMutation,
  useEdtPowerMutation,
  useRmvPowerMutation,

  // --- Province api hooks ---
  useGetProvincesQuery,
  useAddProvinceMutation,
  useEdtProvinceMutation,
  useRmvProvinceMutation,

  // --- Printer api hooks ---
  useGetLOVPrintersQuery,
  useAddLOVPrinterMutation,
  useEdtLOVPrinterMutation,
  useRmvLOVPrinterMutation,
  //\\//\\//\\//\\//\\//\\//\\
  useGetAllPrintersMutation,
  useGetPrintersQuery,
  useAddPrinterMutation,
  useEdtPrinterMutation,
  useRmvPrinterMutation,
  // --- Scanner api hooks ---
  useGetLOVScannersQuery,
  useAddLOVScannerMutation,
  useEdtLOVScannerMutation,
  useRmvLOVScannerMutation,
  //\\//\\//\\//\\//\\//\\//\\
  useGetAllScannersMutation,
  useGetScannersQuery,
  useAddScannerMutation,
  useEdtScannerMutation,
  useRmvScannerMutation,

  // --- Software api hooks ---
  useGetLOVSoftwaresQuery,
  useAddSoftwareMutation,
  useEdtSoftwareMutation,
  useRmvSoftwareMutation,

  // --- Sort api hooks ---
  useClearSortMutation,
  usePostSortMutation,

  // --- Storage api hooks ---
  useGetLOVStoragesQuery,
  useAddStorageMutation,
  useEdtStorageMutation,
  useRmvStorageMutation,

  // --- Telephone api hooks ---
  useGetLOVTelephonesQuery,
  useAddLOVTelephoneMutation,
  useEdtLOVTelephoneMutation,
  useRmvLOVTelephoneMutation,
  //\\//\\//\\//\\//\\//\\//\\
  useGetAllTelephonesMutation,
  useGetTelephonesQuery,
  useAddTelephoneMutation,
  useEdtTelephoneMutation,
  useRmvTelephoneMutation,

  // --- UserLevel api hooks ---
  useGetLOVUserLevelsQuery,
  useAddUserLevelMutation,
  useEdtUserLevelMutation,
  useRmvUserLevelMutation,

  // --- User api hooks ---
  useGetAllUsersQuery,
  useChngUsrPswrdMutation,
  useEdtUserMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterMutation,
  useRmvUserMutation,
} = SamaApi;
