import React, { useEffect, useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine, RiDeleteBin6Fill } from '@remixicon/react'
import { timeStamp } from '../helpers/timestamp'


const AllNotes = ({ notes, setNotes }) => {
    const [query, setQuery] = useState('')

    // DELETING NOTES
    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id))
    }

    // UPDATING NOTES
    const updateTodo = (value, id) => {
        setNotes(prev => prev.map(note => note.id === id ? { ...note, content: value } : note))
    }

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1)
    const notesPerPage = 10;

    const pageLastIndex = notesPerPage * currentPage;
    const pageFirstIndex = pageLastIndex - notesPerPage;
    const totalPages = Math.ceil(notes.length / notesPerPage);
    const notesFromArray = notes.slice(pageFirstIndex, pageLastIndex)
    
    const [filteredNotes, setFilteredNotes] = useState(notesFromArray)
    const filteredTotalPages = Math.ceil(filteredNotes.length / notesPerPage);

    // HANDLING NEXT PAGE BUTTON
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    // HANDLING PREVIOUS PAGE BUTTON
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }
    
    // HANDLING SEARCH
    const searchNote = (value) => {
        const queryValue = value?.toLowerCase()
        setQuery(queryValue)

        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(queryValue) ||
            note.content.toLowerCase().includes(queryValue)
        );

        setFilteredNotes(filtered);
    }

    // UPDATING NOTES WHEN ADDED
    useEffect(() => {
        setFilteredNotes(notesFromArray)
    }, [pageFirstIndex, pageLastIndex, notes])

    return (
        <>
            <h1 className='text-[42px] font-extrabold'>NOTES</h1>
            <input value={query} onChange={(e) => searchNote(e.target.value)} className='text-center focus:outline-none p-2 rounded-full bg-[#F9F9F9] w-full' placeholder='Search' type="text" />
            <p className='mt-4'>{query !== '' ? filteredNotes.length : notes.length} Notes</p>
            <div className='md:overflow-y-scroll scroll md:max-h-[70vh] flex flex-col gap-4 pt-4'>
                {filteredNotes.length < 1 ? (
                    <p className='text-center text-xl font-semibold pt-10'>No Notes</p>
                ) : (
                    filteredNotes?.map(note => (
                        <div key={note.id} className='md:w-[450px] w-full h-[140px] hover:bg-[#67DDE4] transition-all duration-300 flex flex-col gap-2 p-6 pt-4 rounded-xl bg-[#F9F9F9]'>
                            <h2 className='text-black font-bold text-lg'>{note.title?.charAt(0).toUpperCase() + note.title?.slice(1)}</h2>
                            <input
                                className='bg-transparent text-sm focus:outline-none'
                                onChange={(e) => updateTodo(e.target.value, note.id)}
                                value={note.content?.charAt(0).toUpperCase() + note.content?.slice(1)}
                                type='text' />
                            <div className='flex relative px-1 -bottom-2 justify-between'>
                                <span className='text-sm'>{timeStamp(note.timestamp)}</span>
                                <span onClick={() => deleteNote(note.id)}><RiDeleteBin6Fill size={20} className='cursor-pointer' color='gray' /></span>
                            </div>
                        </div>
                    ))
                )}
                <div className='flex items-center justify-center gap-8'>
                    <span onClick={() => handlePrevPage()} className='p-2 cursor-pointer rounded-full border border-gray-400'><RiArrowLeftSLine /></span>
                    <span>Page {currentPage} of {query !== '' ? filteredTotalPages : totalPages}</span>
                    <span onClick={() => handleNextPage()} className='p-2 cursor-pointer rounded-full border border-gray-400'><RiArrowRightSLine /></span>
                </div>
            </div>
        </>
    )
}

export default AllNotes