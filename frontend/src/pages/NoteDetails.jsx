 import React, { useEffect, useState } from 'react'

import {useNavigate, useParams} from 'react-router'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { LoaderIcon,ArrowLeft,Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'

function NoteDetails() {

  const [note,setNote] = useState({ title: "", content: "" });
  const [loading,setLoading] = useState(false);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();
  
  useEffect(()=>{
    const fetchNote = async ()=>{
       try{
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
       }catch(error){
        console.log("Failed to fetch note",error)
        toast.error("Failed to fetch the note")
       }finally{
        setLoading(false);
       }

    }
    fetchNote();
  },[id]);
  
  const handleDelete = async ()=>{
        if(!window.confirm("Are you want to delete this note")) return;
         try{
            await api.delete(`/notes/${id}`)
            toast.success("Note deleted successfully")
            navigate("/");

         }catch(error){
            console.log("Error deleting the note",error);
            toast.error("Failed to delete the note")

         }
  }
  const handleSave = async()=>{
         if(!note.title.trim() || !note.content.trim()){
          toast.error("please add a title or content");
          return;
         }
         setSaving(true);

         try{
            await api.put(`/notes/${id}`,note)
            toast.success("Note updated successfully");
            navigate("/");
         }catch(error){
            console.log("Failed updating note",error);
            toast.error("Failed updating note")
         }finally{
          setSaving(false);
         }
  }

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'></LoaderIcon>

      </div>
    )
  }


  return (
    <div className='min-h-screen bg-base-200' >
      <div className='container mx-auto px-4 py-8 '>
       <div className='max-w-2xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Link to={"/"} className='btn btn-ghost '>
             <ArrowLeft className='h-5 w-5'/>
             Back to Notes 
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='h-5 w-5'></Trash2Icon>
            Delete Note
          </button>
        </div>

        <div className='card bg-base-100'>
          <div className="card-body">
            <div className="form-control mb-4">
              <label className='label'>
                <span className='label-text '>Title</span>
              </label><br /><br />
              <input type="text" placeholder='Note Title' className='input input-bordered w-full'
                     value={note.title} onChange={(e)=> setNote({...note, title: e.target.value})} />
            </div>

            <div className='form-control mb-4'>
                  <label  className='label'>
                    <span className='label-text '>Content</span>
                  </label><br /> <br />
                  <textarea  placeholder='Write your Note here..' className='textarea textarea-bordered h-32 w-full'
                   value={note.content} onChange={(e)=> setNote({...note, content: e.target.value})}/>

                </div>

            <div className="card-actions justify-end">
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                 {saving ? "saving..." : "Save Changes"}
              </button>

            </div>

            
          </div>

        </div>
       </div>

      </div>
      
    </div>
  )
}

export default NoteDetails