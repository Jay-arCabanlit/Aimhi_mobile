import axios from 'axios';
import {useQuery, useQueries, useMutation} from 'react-query';
import {useSelector, useDispatch} from 'react-redux';
import {Store} from '../../redux/Store/store';

let IP = 'https://dev.api.aimhi.ai/';

//get Dashboard data
export const DashBoardData = async company_id => {
  return axios({
    method: 'get',
    url: IP + `dashboard/project/details?company=${company_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

//get all project per user
export const ProjectListData = async (user_id, company_id) => {
  let data = {
    company_id: company_id,
    name_only: false,
    filter: {},
    sort: {},
    user_id: user_id, // this will be not necessary if token auth is implemented properly
  };
  return axios({
    method: 'post',
    url: IP + 'project/list',
    data: data,
    headers: {
      'content-type': 'application/vnd.myapp.type+json',
    },
  });
};

//get scope of work per project
export const TaskList = async (project_id, company_id) => {
  return axios({
    method: 'get',
    url: IP + `sow/details/${company_id}/${project_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const UpdateStatus = async data => {
  return axios({
    method: 'post',
    url: IP + 'sow/save',
    data: {data},
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const GetUpdates = async (
  companyId,
  projectId,
  page,
  limit,
  user_id,
  accessToken,
) => {
  return axios({
    method: 'get',
    url:
      IP +
      `project/updates/${companyId}/${projectId}/${user_id}?page=${page}&limit=${limit}`,
    headers: {
      'content-type': 'application/vnd.myapp.type+json',
      Authorization: 'Bearer ' + accessToken,
    },
  });
};

export const getEquipmentUsage = (
  companyId,
  projectId,
  status,
  accessToken,
) => {
  return axios({
    method: 'get',
    url:
      IP +
      `equipment/usage?company=${companyId}&project=${projectId}&archive=${status}`,
    headers: {
      'content-type': 'application/vnd.myapp.type+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getByGroupId = (groupId, accessToken) => {
  return axios({
    method: 'get',
    url: IP + `equipment/usage/${groupId}`,
    headers: {
      'content-type': 'application/vnd.myapp.type+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getReport = (
  companyId,
  projectId,
  reportType,
  status,
  accessToken,
) => {
  console.log(companyId, projectId, reportType, status, accessToken);
  return axios({
    method: 'get',
    url:
      IP + `report/${companyId}/${projectId}/${reportType}?archived=${status}`,
    headers: {
      'content-type': 'application/vnd.myapp.type+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getDetails = (reportType, reporrtLogId, accessToken) => {
  return axios({
    method: 'get',
    url: IP + `report/details/${reportType}/${reporrtLogId}`,
    headers: {
      'content-type': 'application/vnd.myapp.type+json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
