import React from 'react';

import TextField from "@mui/material/TextField";

import { useStylesOne } from './Q&A_Container';

export default function QuestionTextField({ initialValue, onChange }) {
    const classes = useStylesOne();
    const handleChange = (event) => {
        const newText = event.target.value;
        onChange(newText); // Notify parent component of the change
    };

    
    return (
        <div>
            <TextField className={classes.bigTextField}
                id="standard-textarea"
                maxRows={6}
                placeholder={"Type your question here..."}
                multiline
                sx={{ marginTop: '20px', marginLeft: '25px', width: '600px' }}
                InputProps={{ sx: { borderRadius: '20px' } }}
                value={initialValue} // Bind value to initialValue prop
                onChange={handleChange} // Notify parent component of the change
            />
        </div>
    )
}