 import React, { use, useEffect, useState } from 'react'
import Navbar from '../componenets/Navbar'
import RateLimitedUI from '../componenets/RateLimitedUI';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import NoteCard from '../componenets/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../componenets/NotesNotFound';

function Homepage() {
    // fetch api data from backend http://localhost:5001/api/notes and display it on the homepage
    const [isRateLimited, setIsRateLimited] = useState(false);
    const[loding, setLoading] = useState(true);
    const[notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/notes');
                setIsRateLimited(false);
                // Reset rate limit state on successful fetch
                console.log(response.data);
                setNotes(response.data);
                setLoading(false);
                // Handle the response data as needed
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    setIsRateLimited(true);
                    toast.error('Rate limit reached. Please try again later.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, []);
    
  return (
    <div className='min-h-screen'>
        <Navbar />
       { isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            { loding&& <div className="text-center text-primary py-10">Loding notes...</div>}

            {notes.length === 0 && !isRateLimited && <NotesNotFound />}

            {notes.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    ))}
                        

                </div>
            )}

        </div>

            
    </div>
  )
}

export default Homepage