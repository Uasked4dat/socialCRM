'use client';
import NavBar from '@/components/NavBar';
import React from 'react';
import MyDatePicker from '@/components/MyDatePicker';

const NewProfilePage = () => {
    return (
        <div className='space-y-5'>
            <NavBar />
            <section className='mx-5 space-y-5 max-w-xl'>
                <div className='flex flex-col space-y-5'>
                    <input type="text" placeholder="First Name(s)" className='input input-bordered w-full placeholder-neutral-content text-base'></input>
                    <input type="text" placeholder="Last Name" className='input input-bordered w-full placeholder-neutral-content text-base'></input>
                    <MyDatePicker />
                    <textarea
                        placeholder="3 Common Interests"
                        className="textarea textarea-bordered textarea-md w-full placeholder-neutral-content text-base">
                    </textarea>
                </div>
                <div className='flex justify-end'>
                    <button className="btn btn-active btn-secondary">Add Person</button>
                </div>
            </section>
        </div>
    )
}

export default NewProfilePage;
