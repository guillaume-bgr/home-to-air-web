import Swal from 'sweetalert2'

export const SimpleAlert = (text='Alerte', icon='info', showCancelButton=false, showCloseButton=true, position='center') =>{
    Swal.fire({
        title: text,
        icon: icon,
        showCancelButton: showCancelButton,
        position: position,
        showCloseButton: showCloseButton,
      })
}

export const TimerAlert = (text= 'Timer Alert', icon= 'info', position='center', showCancelButton=false, showCloseButton=false, timer = 1500) => {
    Swal.fire({
        title: text,
        icon: icon,
        showCancelButton: showCancelButton,
        position: position,
        showCloseButton: showCloseButton,
        timer: timer
      })
}

export const ValidationAlert = (
        text ='Êtes vous sur ?',
        validationFunc = () => TimerAlert("C'est validé", "success"), 
        params=0,
        icon = 'warning',
        showCancelButton = true,
        showCloseButton = false, 
        confirmButtonColor = '#3085d6', 
        cancelButtonColor = '#d33',
        confirmButtonText = 'Confirmer',
        position = 'center') => {
        Swal.fire({
        title: text,
        icon: icon,
        showCancelButton: showCancelButton,
        showCloseButton : showCloseButton,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
        confirmButtonText: confirmButtonText,
        position: position,
      }).then((result) => {
        if (result.isConfirmed == true) {
          validationFunc(params)
        }
      })
}

export const ToastAlert = (text = 'Erreur', position = 'top-right', timer = 3000) => {
  Swal.fire({toast: true,
  icon: 'error',
  title: text,
  position: position,
  showConfirmButton: false,
  timer: timer,
  timerProgressBar: true,
})}