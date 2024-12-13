/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';

import { format } from 'date-fns';
import { Edit2, Trash2, } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Note } from '@/types/note';
import EditNoteDialog from './EditNoteDialog';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      case 'order':
        return 'bg-purple-100 text-purple-800';
      case 'inventory':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/note?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      await onDelete(id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // const handleUpdate = async (id: string, data: any) => {
  //   try {
  //     const response = await fetch(`/api/note/${id}.ts`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update note');
  //     }

  //     const updatedNote = await response.json();
  //     await onUpdate(id, updatedNote);
  //   } catch (error) {
  //     console.error('Error updating note:', error);
  //   }
  // };

  return (
    <div
      
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-none">{note.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={getTypeColor(note.type)}>
                  {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                </Badge>
                {note.priority && (
                  <Badge className={getPriorityColor(note.priority)}>
                    {note.priority.charAt(0).toUpperCase() + note.priority.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{note.content}</p>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <span className="text-sm text-gray-500">
            {format(new Date(note.createdAt), 'MMM d, yyyy')}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this note? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>

      <EditNoteDialog
        note={note}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdate={onUpdate}
        
        
      />
    </div>
  );
}
