import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className='task' onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(task.id)} />
            </h3>
            <p>{task.day}</p>
        </div >
    )
}

Task.propTypes = {
    // key: PropTypes.string,
    task: PropTypes.string
}
export default Task
