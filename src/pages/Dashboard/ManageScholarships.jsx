import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import UpdateScoloarship from './updateScolarship/UpdateScoloarship';
import Swal from 'sweetalert2'

const ManageScholarships = () => {
     const modalRef=useRef()

     const axiosSecure = useAxiosSecure()
     const 
     [updatedata,setUpdatedata]=useState({})

const { data = [] ,refetch } = useQuery({
  queryKey: ['scholarships','manageScolarship'],
  queryFn: async () => {
    const res = await axiosSecure.get('/scholarships')
    return res.data?.scholarData
  }
})

const handleupdate=(data)=>{
    modalRef.current.showModal()
    setUpdatedata(data)
    
}
const handleDeletescholar=async(id)=>{
       
       
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
  if (result.isConfirmed) {
     const res= await axiosSecure.delete(`/scholarships/${id}`)

     
       console.log(res.data)
        if(res.data.deletedCount)
        {       refetch()
              Swal.fire({
                    position: "center",
                    icon: "success",
                    title: " Scholarships Delete successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
        }
    
  }
});
      
}
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
        data.map((data,index)=> <tr key={data._id}>
        <th>{index + 1}</th>
        <td>{data.scholarshipName}</td>
        <td>{data.universityCountry}</td>
        <td>{data.degree}</td>
        <td className="text-red-500 font-medium">{data.applicationDeadline}</td>
        <td>{data.serviceCharge}$</td>
        <td className="flex gap-2">
        <button className="btn btn-primary " onClick={()=>handleupdate(data)}>Update</button>
          <button onClick={()=>handleDeletescholar(data._id)} className="btn btn-sm btn-error">Delete</button>
 
        </td>
  
      </tr>)
       }

     
    </tbody>

   
  </table>
</div>

<UpdateScoloarship updatedata={updatedata} modalRef={modalRef} refetch={refetch}></UpdateScoloarship>
    </>
    
    );
};

export default ManageScholarships;