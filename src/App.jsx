import { useEffect, useState } from 'react'
import AllNotes from './components/AllNotes'
import AddNote from './components/AddNote'
import { v4 as uuidv4 } from 'uuid';

// RETRIEVING NOTES FROM LOCAL STORAGE
const notesFromStorage = () => {
  const localNotes = localStorage.getItem('notes')
  if (localNotes) {
    const parsedNotes = JSON.parse(localNotes)
    return parsedNotes
  }
  return [{
    id: uuidv4(),
    title: 'my first note',
    content: 'This is my first note here',
    timestamp: new Date().toISOString()
  }]
}


function App() {
  const [notes, setNotes] = useState(notesFromStorage())
  const [showAddNote, setShowAddNote] = useState(false)

  // SETTING NOTES TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <>
      <section className='w-full md:h-screen min-h-screen relative'>
        <div onClick={() => setShowAddNote(false)} className={`h-full w-full absolute z-20 top-0 left-0 bg-black opacity-30 ${showAddNote ? '' : 'hidden'}`}></div>
        <div className={`gap-4 z-50 items-center w-full flex flex-col fixed top-12 ${showAddNote ? '' : 'hidden'}`}>
          <AddNote setNotes={setNotes} setShowAddNote = {setShowAddNote} />
        </div>


        <div className='w-full md:flex'>
          <div className='basis-[40%] md:p-8 p-4 md:pt-3'>
            <AllNotes notes={notes} setNotes={setNotes} />
          </div>
          <div className={`basis-[70%] mx-auto hidden gap-4 items-center md:flex flex-col pt-20`}>
            <AddNote setNotes={setNotes} />
          </div>
        </div>

        <div className='fixed left-1/2 -translate-y-1/2 -translate-x-1/2 md:hidden block bottom-12 w-fit'>
          <button onClick={() => setShowAddNote(prev => !prev)} className='w-fit px-7 font-semibold py-2 bg-[#67DDE4] rounded-full'>ADD NOTE</button>
        </div>
      </section>
    </>
  )
}

export default App
