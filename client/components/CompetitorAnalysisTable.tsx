import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import SourcesModal from './common/SourcesModal';
import { SiCrowdsource } from 'react-icons/si';
import UrlMetadataGrid from './common/Sources/ShowAllSources';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface CompetitorAnalysisTableProps {
  data: {
    key: string;
    data: {
      competitors: {
        company_name: string;
        valuation: string;
        money_raised: string;
        key_focus: string;
      }[];
      sources: string[];
    };
    status: string;
  };
}

const CompetitorAnalysisTable: React.FC<CompetitorAnalysisTableProps> = ({ data }) => {
  const {
    competitors,
    sources
  } = data.data ?? {
    competitors: [],
    sources: []
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box width={'100%'} mx="auto" p={3} mt={5} sx={{ backgroundColor: 'hsl(var(--accent))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Competitor Analysis & Market Players
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: 'hsl(var(--background))' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'hsl(var(--foreground))' }}><strong>Company</strong></TableCell>
              <TableCell sx={{ color: 'hsl(var(--foreground))' }}><strong>Valuation</strong></TableCell>
              <TableCell sx={{ color: 'hsl(var(--foreground))' }}><strong>Money Raised</strong></TableCell>
              <TableCell sx={{ color: 'hsl(var(--foreground))' }}><strong>Key Focus</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competitors.map((item, index) => (
              <TableRow key={index} sx={{ backgroundColor: 'hsl(var(--source))' }}>
                <TableCell sx={{ color: 'hsl(var(--foreground))' }}>{item.company_name}</TableCell>
                <TableCell sx={{ color: 'hsl(var(--foreground))' }}>{item.valuation}</TableCell>
                <TableCell sx={{ color: 'hsl(var(--foreground))' }}>{item.money_raised}</TableCell>
                <TableCell sx={{ color: 'hsl(var(--foreground))' }}>{item.key_focus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3}>
        <Box display="flex" alignItems="center" mb={1}>
          <SiCrowdsource style={{ marginRight: 8 }} />
          <Typography variant="h6">Sources</Typography>
        </Box>
        <UrlMetadataGrid sources={sources} />
      </Box>
    </Box>
  );
};

export default CompetitorAnalysisTable;
