'use client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import { CreatePeople, LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as z from 'zod';

type FormType = z.infer<typeof CreatePeople>;
const ReactSelect = ({ groups }: { groups: any }) => {
    const form = useForm<FormType>({
        resolver: zodResolver(CreatePeople),
        defaultValues: {
            name: '',
            description: '',
            rt: '',
            group: '',
        },
    });

    const optionsGroup: { value: any; label: any }[] = _.map(groups, (item) => ({
        value: item.name,
        label: item.name,
    }));

    function onSubmit(values: z.infer<typeof CreatePeople>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div className="panel mx-auto mt-8 max-w-96">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-28 py-2">Username</FormLabel>
                                <div className={`${form.formState.errors.name ? 'has-error' : ''}`}>
                                    <FormControl className="">
                                        <input {...field} type="text" placeholder="John Doe" className={`form-input text-base`} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-28 py-2">Description</FormLabel>
                                <div className={`${form.formState.errors.description ? 'has-error' : ''} `}>
                                    <FormControl className="">
                                        <input {...field} type="text" placeholder="John Doe" className={`form-input text-base`} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-28 py-2">Gropu</FormLabel>
                                <div className={`${form.formState.errors.group ? 'has-error' : ''} `}>
                                    <FormControl className="">
                                        <input {...field} type="text" placeholder="John Doe" className={`form-input text-base`} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rt"
                        render={({ field }) => (
                            <FormItem className="flex">
                                <FormLabel className="w-28 py-2">RT</FormLabel>
                                <div className={`${form.formState.errors.rt ? 'has-error' : ''}`}>
                                    <FormControl className="">
                                        <input {...field} type="text" placeholder="John Doe" className={`form-input text-base`} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Submit
                    </button>
                </form>
            </Form>
        </div>
    );
};

export default ReactSelect;
