import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders : async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {}

      if(idToken){
        headers.set("Authorization", `Bearer ${idToken}`)
      }
      return headers;
    }
  }),
  reducerPath: "api",
  tagTypes: ["Managers","Tenants"],
  endpoints: (build) => ({

    // query is for GET Requests
    // mutation is for PUT, PATCH, DELETE requests ==> anything that changes the data.

    getAuthUser : build.query<User, void>({
      queryFn : async (_ , _queryApi, _extraoptions, fetchWithBQ) => {
        try{
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          console.log("IdToken : " , idToken);

          const user = await getCurrentUser()
          console.log("user : " , user)
          const userRole = idToken?.payload["custom:Role"] as string

          const endpoint = 
            userRole === 'manager'
            ? `/managers/${user?.userId}`
            : `/tenants/${user?.userId}`

            let userDetailsResponse = await fetchWithBQ(endpoint)

            console.log("userDetailsResoonse : ", userDetailsResponse)

            if(userDetailsResponse?.error ){
              console.log('Fwetch with Bq failed : ' , userDetailsResponse.error)      // yh chala
            }
            else{
              console.log('userDetailsResponse',userDetailsResponse)
              console.log('userDetailsResponse.data',userDetailsResponse.data)

            }
            console.log('userDetailsResponse',userDetailsResponse)

            // if user does not exists , create a new user..
            if(userDetailsResponse.error && userDetailsResponse.error.status === 404 ){
              userDetailsResponse = await createNewUserInDatabase( user , idToken, userRole , fetchWithBQ)
            }

            return {
              data : {
                cognitoInfo : {...user},
                userInfo : userDetailsResponse.data as Tenant | Manager  ,
                userRole  ,
              },
            }
        }catch(error : any  ){
          return { error : error.message || "Could not fetch userdata"}
        }
      }
    }),

// we want Tenant is Return
// we'll give cognitoId and somedetails of the Tenant
    updateTenantSettings : build.mutation<Tenant, {cognitoId : string} & partial<Tenant>  >({
     query : ({ cognitoId , ...updatedTenant}) => ({
      url : `tenants/${cognitoId}`,
      method : `PUT`,
      body : updatedTenant
     }),
     invalidatesTags : (result) => [{ type : "Tenants" , id : result.id}]
    }),


    updateManagerSettings : build.mutation<Manager , {cognitoId : string} & partial<Manager> >({
      query : ({ cognitoId , ...updatedManager}) => ({
        url : `managers/${cognitoId}`,
        method : "PUT",
        body : updatedManager
      }),
      invalidatesTags : (result) => [{ type : "Managers" , id : result.id}]
    })


  }),
});

export const {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
  useUpdateManagerSettingsMutation,
} = api