import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../AssignTask/AssignTask.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Main from '../Main';
import axios from 'axios';

const AssignTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createTask = async () => {
    try {
      const newTask = {
        projectId,
        projectName,
        taskDescription,
        assignee,
        startDate,
        endDate,
        status,
      };
  
      await axios.post('http://localhost:8001/task/create', newTask);
  
      fetchTasks(); 
  
      setProjectId('');
      setProjectName('');
      setTaskDescription('');
      setAssignee('');
      setStartDate('');
      setEndDate('');
      setStatus('');
      handleCloseModal();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8001/task/display'); 
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    const currentDateTime = new Date().toLocaleString();
    const dateText = `Date and Time: ${currentDateTime}`;
    const headingText = 'TMC Tool';

    const dateTextWidth = doc.getTextWidth(dateText);
    const headingTextWidth = doc.getTextWidth(headingText);
    const pageWidth = doc.internal.pageSize.getWidth();

    const dateTextX = (pageWidth - dateTextWidth) / 2;
    const headingTextX = (pageWidth - headingTextWidth) / 2;

    doc.text(dateText, dateTextX, 10);
    doc.setFontSize(16);
    doc.text(headingText, headingTextX, 20);
    doc.setFontSize(12);
    autoTable(doc, { html: '.task-table' });
    doc.save('table.pdf');
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Task List');
    XLSX.writeFile(workbook, 'task-list.xlsx');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      setTasks(excelData);
    };

    reader.readAsArrayBuffer(file);
  };

  const filteredTasks = tasks.filter((task) => {
    const searchValue = search.toLowerCase();
    return (
      task.projectId.toLowerCase().includes(searchValue) ||
      task.projectName.toLowerCase().includes(searchValue)
    );
  });

  return (
    <>
      <Main />
      <div className="form-container">
        <div className="assign-task-container">
          <h1 className="assign-task-text">ASSIGN TASK</h1>
          <div className="row-button1">
            <Button
              variant="contained"
              color="error"
              onClick={downloadPDF}
              style={{ marginRight: '10px' }}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={downloadExcel}
              style={{ marginRight: '10px' }}
            >
              Download Excel
            </Button>
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <Button
                variant="contained"
                color="secondary"
                component="span"
                style={{ marginRight: '10px' }}
              >
                Upload Excel
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTask}
              className="add-task-button12"
            >
              Add Task
            </Button>
          </div>
        </div>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              height: 580,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 5,
              borderRadius: 5,
            }}
          >
            <h2 id="modal-modal-title">Add Task</h2>
            <TextField
              fullWidth
              label="Project ID"
              variant="outlined"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              sx={{ marginBottom: 1 }}
              required
            />
            <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              sx={{ marginBottom: 1 }}
              required
            />
            <TextField
              fullWidth
              label="Task Description"
              variant="outlined"
              multiline
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              fullWidth
              label="Assignee"
              variant="outlined"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              variant="outlined"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              fullWidth
              type="date"
              label="End Date"
              variant="outlined"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ marginBottom: 1 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={createTask}>
              Submit
            </Button>
          </Box>
        </Modal>
        <div className="task-details-container">
          <div className="search-inputs">
            <TextField
              label="Search by Project ID or Name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <TableContainer>
            <Table className="task-table">
              <TableHead>
                <TableRow>
                  <TableCell>Project ID</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Task Description</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>{task.projectId}</TableCell>
                    <TableCell>{task.projectName}</TableCell>
                    <TableCell>{task.taskDescription}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>{task.startDate}</TableCell>
                    <TableCell>{task.endDate}</TableCell>
                    <TableCell>{task.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default AssignTask;
