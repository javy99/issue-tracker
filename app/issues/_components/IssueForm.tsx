'use client'

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const [error, setError] = useState<string>('')
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues/list')
            router.refresh()
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
                <TextField.Root placeholder='Title' {...register('title')} defaultValue={issue?.title} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm