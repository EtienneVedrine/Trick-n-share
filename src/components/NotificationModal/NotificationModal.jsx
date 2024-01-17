import PropTypes from 'prop-types'

const NotificationModal = ({isSuccess, message}) => {
    return (
        <div className={isSuccess ? ('p-4 bg-emerald-200 rounded-xl') : ('p-4 bg-pink-300 rounded-xl')}>
            <p className='font-bold text-center'>{message}</p>
        </div>
    )
}

NotificationModal.propTypes = {
    isSuccess: PropTypes.bool,
    message: PropTypes.string
}

export default NotificationModal;