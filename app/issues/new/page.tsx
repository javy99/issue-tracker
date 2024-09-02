'use client'

import dynamic from 'next/dynamic';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const [error, setError] = useState<string>('')
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setSubmitting(false)
            setError('An unexpected error occurred.')
        }
    })

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={onSubmit}
            >
                <TextField.Root placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>

    )
}

export default NewIssuePage