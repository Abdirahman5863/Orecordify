// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Search, Tag, Calendar, AlertCircle } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import NoteCard from '@/components/notes/NoteCard';
// import CreateNoteDialog from '@/components/notes/CreateNoteDialog';
// import NotesFilter from '@/components/notes/NotesFilter';
// import { Note } from '@/types/note';

// export default function NotesPage() {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState<string>('all');
//   const [selectedPriority, setSelectedPriority] = useState<string>('all');
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const response = await fetch('/api/notes');
//       if (!response.ok) throw new Error('Failed to fetch notes');
//       const data = await response.json();
//       setNotes(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch notes",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateNote = async (newNote: any) => {
//     try {
//       const response = await fetch('/api/notes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newNote),
//       });

//       if (!response.ok) throw new Error('Failed to create note');

//       toast({
//         title: "Success",
//         description: "Note created successfully",
//       });

//       fetchNotes();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create note",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleUpdateNote = async (id: string, updatedData: any) => {
//     try {
//       const response = await fetch('/api/notes', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, ...updatedData }),
//       });

//       if (!response.ok) throw new Error('Failed to update note');

//       toast({
//         title: "Success",
//         description: "Note updated successfully",
//       });

//       fetchNotes();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update note",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteNote = async (id: string) => {
//     try {
//       const response = await fetch(`/api/notes?id=${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) throw new Error('Failed to delete note');

//       toast({
//         title: "Success",
//         description: "Note deleted successfully",
//       });

//       fetchNotes();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete note",
//         variant: "destructive",
//       });
//     }
//   };

//   const filteredNotes = notes.filter(note => {
//     const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       note.content.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = selectedType === 'all' || note.type === selectedType;
//     const matchesPriority = selectedPriority === 'all' || note.priority === selectedPriority;
//     return matchesSearch && matchesType && matchesPriority;
//   });

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Notes</h1>
//             <p className="text-gray-500 mt-1">Organize your thoughts and ideas</p>
//           </div>
//           <CreateNoteDialog onNoteCreated={handleCreateNote} />
//         </div>

//         <div className="grid gap-6 md:grid-cols-[250px,1fr]">
//           <div className="space-y-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <Input
//                 type="text"
//                 placeholder="Search notes..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <NotesFilter
//               selectedType={selectedType}
//               selectedPriority={selectedPriority}
//               onTypeChange={setSelectedType}
//               onPriorityChange={setSelectedPriority}
//             />

//             <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//               <div className="flex items-start">
//                 <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
//                 <div>
//                   <h3 className="text-sm font-medium text-yellow-800">Quick Tip</h3>
//                   <p className="mt-1 text-sm text-yellow-700">
//                     Use filters to quickly find specific notes. You can combine search with type and priority filters.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {filteredNotes.map((note) => (
//               <NoteCard
//                 key={note.id}
//                 note={note}
//                 onUpdate={handleUpdateNote}
//                 onDelete={handleDeleteNote}
//               />
//             ))}
//             {filteredNotes.length === 0 && (
//               <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
//                 <div className="text-gray-400 mb-4">
//                   <Tag className="h-12 w-12" />
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-1">No notes found</h3>
//                 <p className="text-gray-500 text-center mb-4">
//                   {searchTerm || selectedType !== 'all' || selectedPriority !== 'all'
//                     ? "Try adjusting your filters or search term"
//                     : "Create your first note to get started"}
//                 </p>
//                 <CreateNoteDialog onNoteCreated={handleCreateNote} />
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }