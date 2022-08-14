import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Timer from 'react-compound-timer'
import Typography from '@material-ui/core/Typography'


const day = 1000 * 60 * 60 * 24
const hour = 1000 * 60 * 60
const minute = 1000 * 60


const useStyles = makeStyles(theme => ({
  wrapper: {
    textAlign: 'center',
    margin: [theme.spacing(6), 0, theme.spacing(4)]
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  timeBox: {
    borderRadius: theme.shape.borderRadius,
    border: [1, 'solid', '#a9a9a9'],
    padding: [4, 5],
    margin: [0, 3]
  },
  caption: {
    lineHeight: 1.8
  },
  digit: {
    color: theme.palette.primary.main,
    fontSize: 72,
    [theme.breakpoints.down('xs')]: {
      fontSize: 52
    },
    fontWeight: 700,
    lineHeight: 1
  }
}))


export default function Countdown ({ time }) {
  const c = useStyles()

  return (
    <div className={c.wrapper}>
      <Typography variant="h5" gutterBottom>
        Time until registration closes
      </Typography>
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        initialTime={time}
        direction="backward"
      >
        {() => (
          <div className={c.timer}>
            {(time / day > 1) && <div className={c.timeBox}>
              <div className={c.digit}>
                <Timer.Days/>
              </div>
              <Typography variant="overline" className={c.caption}>Days</Typography>
            </div>}
            {(time / hour > 1) && <div className={c.timeBox}>
              <div className={c.digit}>
                <Timer.Hours/>
              </div>
              <Typography variant="overline" className={c.caption}>Hours</Typography>
            </div>}
            {(time / minute > 1) && <div className={c.timeBox}>
              <div className={c.digit}>
                <Timer.Minutes/>
              </div>
              <Typography variant="overline" className={c.caption}>Minutes</Typography>
            </div>}
            <div className={c.timeBox}>
              <div className={c.digit}>
                <Timer.Seconds/>
              </div>
              <Typography variant="overline" className={c.caption}>Seconds</Typography>
            </div>
          </div>
        )}
      </Timer>
      <Typography variant="h6" gutterBottom>
        Register now to reserve your place!
      </Typography>
    </div>
  )
}
