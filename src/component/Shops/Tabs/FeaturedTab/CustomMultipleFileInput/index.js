import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

// Note: Handeling Material UI styling here...!
const useStyle = makeStyles((theme) => ({

  cusinput: {
    width: "100%",
    height: "45px",
    borderRadius: "4px",
    border: `1px solid #c4c4c4`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px",
  },

  cusinputerr: {
    width: "100%",
    height: "45px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: `1px solid ${theme.palette.common.red}`,
    alignItems: "center",
    padding: "0px 10px",
  },

  filenamecon: {
    width: "70%",
  },

  inputcon: {
    width: "30%",
    textAlign: "right",
  },

  filename: {
    color: theme.palette.common.black,
    fontFamily: 'Poppins, sans-serif',
  },

}));

const CustomMultipleFileInput = ({ setBannerData, field, setFieldValue, error, isFormSubmit, acceptedType }) => {

  // Access Material Ui
  const classes = useStyle();

  const { name, onBlur } = field;

  const [fileName, setFileName] = useState(null);

  const handleinputChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0]; 
    if (file) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setBannerData(filesArray);
      setFileName(file.name) 
      setFieldValue(field.name, file)   
      e.target.value = '';
    }
  } 

  useEffect(() => {
    if(isFormSubmit){
      setFileName(null);  
    }else{
      setFileName(null);
    }
  },[isFormSubmit])

  return (
    <div className={error ? classes.cusinputerr : classes.cusinput}>
      <div className={classes.filenamecon}>  
        <p className={classes.filename}>{fileName ? "File upload successfully" : "File will appear here" }</p> 
      </div>
      <div>
        <input
          name={name}
          accept={acceptedType} 
          type="file"
          onChange={handleinputChange} 
          onBlur={onBlur}
          className="inputfile"
          id={name}
        />
        <label htmlFor={name}>Choose a file</label>
      </div>
    </div>
  );
}

export default CustomMultipleFileInput;