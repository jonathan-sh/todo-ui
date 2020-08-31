import { useRef } from 'react';

const isValid = (it) => it.current && it.current.value !== ''
const isInvalid = (it) => it.current && it.current.value === ''

export default (setFocus = true) => {
    const ref = useRef(null);
    const verify = () => {
       
        if (isInvalid(ref)) {
            if (setFocus) ref.current.focus();
            return false
        }

        if (isValid(ref)) return true;
    };

    return [ref, verify];
}