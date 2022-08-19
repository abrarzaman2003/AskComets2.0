import { buttonColor, cardBoxColor, cardColor, commentBoxColor, textColor } from "./Colors";

export const inputField_styling = {
    "& .MuiInputBase-input": {
        color: textColor, 
    },
    '& label.Mui-focused': {
        color: textColor,
    },
    '& label': {
        color: textColor,
        
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: textColor,
        },
        '&:hover fieldset': {
          borderColor: buttonColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: textColor,
        },
    },
}