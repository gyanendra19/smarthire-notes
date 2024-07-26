import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


const AddNote = ({ setNotes, setShowAddNote }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const addNote = (e) => {
        e.preventDefault()

        // ADDING NOTES
        const newNote = {
            id: uuidv4(),
            title,
            content,
            timestamp: new Date().toISOString()
        }

        setNotes(prev => [...prev, newNote])
        setTitle('')
        setContent('')
        if(window.innerWidth < 765){
            setShowAddNote(false)
        }
    }
    
    return (
        <>
            <h1 className='md:text-4xl text-3xl ml-6 md:mr-36 mb-2 text-[#67DDE4] font-bold'>What's on your mind?</h1>
            <form className='flex flex-col gap-4 w-full' onSubmit={addNote}>
                <input onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Title' className='h-[50px] focus:outline-none p-3 bg-[#F9F9F9] rounded-xl md:w-3/4 w-11/12 mx-auto' type="text" />
                <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Type here...' className='h-[250px] focus:outline-none p-4 bg-[#F9F9F9] rounded-xl md:w-3/4 w-11/12 mx-auto' type="text" />
                <button type='submit' className='bg-[#67DDE4] rounded-xl text-center w-11/12 mx-auto text-xl font-semibold md:w-3/4 py-2'>Add Note</button>
            </form>
        </>
    )
}

export default AddNote