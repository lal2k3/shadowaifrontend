import { Box } from '@mui/material';
import CustomCard from 'components/customCard/CustomCard';
import SummaryIcon from './SummaryIcon';
import { BsCloudFill } from 'react-icons/bs';
import { SiKubernetes } from 'react-icons/si';
import { HiCodeBracketSquare } from 'react-icons/hi2';
import { FaAws } from 'react-icons/fa';
import { BiLogoGoogleCloud } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { FaGitlab } from 'react-icons/fa6';
import { FaBitbucket } from 'react-icons/fa';
import ECS from 'assets/logos/ecsLogo.png';
import GKE from 'assets/logos/google-gke.svg';
import { LiaObjectGroup } from 'react-icons/lia';
import { BsCpuFill } from 'react-icons/bs';
import { FaFolderClosed } from 'react-icons/fa6';
import { RiGlassesLine } from 'react-icons/ri';
import { AiFillTool } from 'react-icons/ai';
import { AppConfig } from 'components/general/AppConfig';

const SummaryCard = () => {
  return (
    <CustomCard
      className="summarycard homepagecard"
      title={`${AppConfig.appName} overlook`}
      titleLogo={<RiGlassesLine />}
    >
      <Box className="summarycardrow titlerow">
        <Box className="summarycardcell"></Box>
        <Box className="summarycardcell">Platform</Box>
        <Box className="summarycardcell">Assets</Box>
        <Box className="summarycardcell">Immediate fix</Box>
      </Box>
      <CustomCard className="summarycardrow">
        <Box className="summarycardcell">
          <SummaryIcon icon={<BsCloudFill />} bgcolor={'#9E9EFF'} />
          Cloud
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<FaAws />} bgcolor={'#FF9B05'} />
          <SummaryIcon icon={<BiLogoGoogleCloud />} bgcolor={'#34A853'} />
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<LiaObjectGroup />} bgcolor={'#9E9EFF'} />
          350 Entities
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<AiFillTool />} bgcolor={'#34A853'} />
          70
        </Box>
      </CustomCard>
      <CustomCard className="summarycardrow">
        <Box className="summarycardcell">
          <SummaryIcon icon={<SiKubernetes />} bgcolor={'#326CE5'} />
          K8s
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<img src={ECS} />} bgcolor={'#e6e6e6'} />
          <SummaryIcon icon={<img src={GKE} />} bgcolor={'#e6e6e6'} />
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<BsCpuFill />} bgcolor={'#326CE5'} />
          500 Nodes
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<AiFillTool />} bgcolor={'#34A853'} />
          130
        </Box>
      </CustomCard>
      <CustomCard className="summarycardrow">
        <Box className="summarycardcell">
          <SummaryIcon icon={<HiCodeBracketSquare />} bgcolor="#39383e" />
          Code
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<FaGithub />} bgcolor={'#39383e'} />
          <SummaryIcon icon={<FaGitlab />} bgcolor={'#FC6D21'} />
          <SummaryIcon icon={<FaBitbucket />} bgcolor={'#2684FF'} />
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<FaFolderClosed />} bgcolor={'#39383e'} />
          435 Repositories
        </Box>
        <Box className="summarycardcell leftborder">
          <SummaryIcon icon={<AiFillTool />} bgcolor={'#34A853'} />
          200
        </Box>
      </CustomCard>
    </CustomCard>
  );
};

export default SummaryCard;
