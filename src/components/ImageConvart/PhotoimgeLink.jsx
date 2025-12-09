import axios from 'axios';
import React from 'react';

const PhotoimgeLink = async(photofile) => {

     const formdata=new FormData();
     formdata.append('image',photofile)
      const imgae_Api_url=`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGE_API_KEY}`
     const res=await axios.post(imgae_Api_url,formdata)
     
    return res.data.data.url;
};

export default PhotoimgeLink;