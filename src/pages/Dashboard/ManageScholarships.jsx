import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { degrees } from 'framer-motion';
import UpdateScoloarship from './updateScolarship/UpdateScoloarship';

const ManageScholarships = () => {

     const axiosSecure = useAxiosSecure()

const { data = [] } = useQuery({
  queryKey: ['scholarships'],
  queryFn: async () => {
    const res = await axiosSecure.get('/scholarships')
    return res.data
  }
})

    return (
        <>
  <div className="overflow-x-auto p-6">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead className="bg-base-300 text-base font-semibold">
      <tr>
        <th>#</th>
        <th>Scholarship Name</th>
        <th>Country</th>
        <th>Degree</th>
        <th>Deadline</th>
        <th>Service Charge</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {/* Row 1 */}
       
       {
        data.map((data,index)=><tr>
        <th>{index + 1}</th>
        <td>{data.scholarshipName}</td>
        <td>{data.universityCountry}</td>
        <td>{data.degree}</td>
        <td className="text-red-500 font-medium">{data.applicationDeadline}</td>
        <td>{data.serviceCharge}$</td>
        <td className="flex gap-2">
          <button className="btn btn-sm btn-warning">Update
            
          </button>
          <button className="btn btn-sm btn-error">Delete</button>
        </td>
      </tr>)
       }

     
    </tbody>
  </table>
</div>

  
        </>
    );
};

export default ManageScholarships;