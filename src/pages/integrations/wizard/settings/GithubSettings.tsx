import { Box, TextField } from '@mui/material';

const GithubSettings = () => {
  return (
    <Box className='githubconfig'>
      <Box>GitHub configurations</Box>
      <TextField label="Url" variant="outlined" />
      <TextField label="Token" variant="outlined" />
    </Box>
  );
};

export default GithubSettings;
