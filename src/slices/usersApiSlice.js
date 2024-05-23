import { apiSlice } from './apiSlice';
const USERS_URL = '/manager';
const core_url = '/core'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${core_url}/api-token-auth/`,
        method: 'POST',
        body: data,
      }
      ),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${core_url}/register/`,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${core_url}/user/change-password`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getUser: builder.mutation({
      query: (data) => ({
        url: `${core_url}/user/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    setImage: builder.mutation({
      query: (data, formData) => ({
        url: `${core_url}/user/set-image`,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          'Authorization' : `Token ${data.auth}`
        },
        body: formData,
      }),
    }),
    getAvailibleProjects: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/projects/${data.status}`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    getAvailibleTeams: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/teams/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    getTasksForUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/tasks/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    joinProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/add/user`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/delete`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    finishProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/finish`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getProjectTasks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}/tasks`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    getProjectInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    getProjectUsers: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}/users`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    deleteUserFromProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/delete/user`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${core_url}/user/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/delete`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    updateTaskStatus: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/status`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    addTaskExecutor: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/task/add/user`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    inviteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/invite/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getInvites: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/invites/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    acceptProjectInvite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/invite/accept`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    declineProjectInvite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/invite/decline`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getTeamInvites: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/team/invites/`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    acceptTeamInvite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/team/invite/accept`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    declineTeamInvite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/team/invite/decline`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getTeamTasks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.team}/tasks`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    getTeamMembers: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.team}/users`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    getArchivedProjects: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/projects/archived`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    inviteUserToTeam: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/team/invite/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getUsersInProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.project}/users`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
      }),
    }),
    getUserPermissionsInProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/permissions/${data.project}/${data.user}`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    updateUserPermissions: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/permissions/edit`,
        method: 'PUT',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    getCommentsByTask: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/comment/get/${data.task}`,
        method: 'GET',
        headers: {
          'Authorization' : `Token ${data.auth}`
        }
      }),
    }),
    sendComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/comment/create`,
        method: 'POST',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    deleteProject: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/project/delete`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
    deleteTaskComment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/comment/delete/${data.comment}`,
        method: 'DELETE',
        headers: {
          'Authorization' : `Token ${data.auth}`
        },
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserMutation,
  useSetImageMutation,
  useGetAvailibleProjectsMutation,
  useGetAvailibleTeamsMutation,
  useGetTasksForUserMutation,
  useCreateProjectMutation,
  useJoinProjectMutation,
  useDeleteProjectMutation,
  useFinishProjectMutation,
  useGetProjectTasksMutation,
  useGetProjectInfoMutation,
  useGetProjectUsersMutation,
  useDeleteUserFromProjectMutation,
  useUpdateProjectMutation,
  useUpdateUserProfileMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useAddTaskExecutorMutation,
  useInviteUserMutation,
  useGetInvitesMutation,
  useAcceptProjectInviteMutation,
  useDeclineProjectInviteMutation,
  useGetTeamInvitesMutation,
  useAcceptTeamInviteMutation,
  useDeclineTeamInviteMutation,
  useGetTeamTasksMutation,
  useGetTeamMembersMutation,
  useGetArchivedProjectsMutation,
  useInviteUserToTeamMutation,
  useGetUsersInProjectMutation,
  useGetUserPermissionsInProjectMutation,
  useUpdateUserPermissionsMutation,
  useGetCommentsByTaskMutation,
  useSendCommentMutation,
  useDeleteTaskCommentMutation,
  useChangePasswordMutation,
} = userApiSlice;