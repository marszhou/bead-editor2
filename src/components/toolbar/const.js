export const items = [
  {
    icon: 'fa-mouse-pointer', name: 'pointer', hotKey: 'v', code: '\uf245', tips: '指针(V)',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwElEQVQ4T5XSP2oCQRQH4G8bsfEsFmJrLpHSwkKbgJUScgdJE7BLSBPwBBaW8QYiVrYWYpsiKWVhJYvMzs5ONX/e+/gxvMz/WqGDR/yV7qPbrPT6hinWTZAQkJvJSBWQjMSAJKQOqEVSgCiSClQiTYAg0hTIkTleb/OTCozwixb22DUBftDDMTTTVQkmeMCwaFrguQ5Y4gljfGCA76Lpgi7O90g5wQtO+CqK2tiiX5zzVO8xIJQw/7xPbDDD4b7oCmIJMhEKFfl2AAAAAElFTkSuQmCC"), auto'
  },

  {
    icon: 'fa-search', name: 'zoom', hotKey: 'z', code: '\uf00e', out: '\uf010', tips: '缩放(Z)',
  // cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABY0lEQVQ4T6XTPUjWURTH8Y+CmEtTSnOTiJYOodSShIMIElIQDg1iTpLQFrUGDpE6qAgqOkhQS1PgokIIFiRoW0ODg5FCEQm5WHLg/uX24Cue6XJevud3z7m3zDmtrKT+Eu7hAVpS7DVmMI+/pf1yQCsWjhG0gjv4nucUgOv4mAW28BzVeJb5v6IefwpfACrxHgEJ68U0buEbNjGB+ynej9EckHd/jKEUfIVPeIEKLKcmoaIRvyMvFHRjDiH7GqrwD8P4jCns4Cbeprxa/CwAd/EGQe7B0iGDXEfkfUmxULB2lIJQVY4R/MJT7KINsdJQ+p+CJqwm8hMMHjKDC/iAq0npwSaiWwxoMd0xamPK47iBbfzALNoT+CEm8y3EuQFxz8JC5kvUIDaT2xgeYa+YQRFsRry201i8k76AlP6Fi+hKE+9IpEiOv7CBd6hL/lAyUAo4qfvl9KCupMTOswKiLofc3gc82kykOopq7wAAAABJRU5ErkJggg=="), auto',
    cursor: 'zoom-in',
  // outCursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABU0lEQVQ4T6XTv0uXURTH8ZdIZIukOOjqFFFmQxg4RTiIIBEG0eAg6iSGbf4Hbk2Gg6mLSy5NQYsKIqSDoGNDQ5stFg5Ohhw5T9wevqnhmZ7nnnPf53N+3CbXtKba/Q68wCgep+8DVvAZv+v5SsATrF8g6Aue4bCMqQCPsFs4fmAetzFTnH/DPZxUZwG4iS0EJGwcy4XcNrzDy/RPJfz8NwBl9jd426CMG9jO2FDRi+MK8AqrCNkPcAvNNchP9ONjxt3BUQUYwRqCPIbNBgoOEHFf0xcK9v+lIMoKBaWKXxhAjDSU/qXgIfaSPIu5BgpasIOeVPpnEpEtGrSRNcbd6PICThPUhfcYzP8JLJZjjO/7iDoriw7HHrRjsqYoRjpdJSg3sQ+xbVexpQSf1t9CK55nx4eSFMHxFr7jE+7meSh5XQdclr0zF6o7A4f/FxD3SsjTMzz2QaRkvsElAAAAAElFTkSuQmCC"), auto'
    outCursor: 'zoom-out'
  },

  {
    icon: 'fa-pencil', name: 'pen', hotKey: 'p', code: '\uf040', tips: '画笔(P)',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2klEQVQ4T6XTMUoDQRiG4WcRrdKbNlewsLHKMewC1iZipeAJRCzEpEoTbGwCAQ9goZAuhwnBwkJkJAs/Yza7IdNN8b7fN/PPFPZcxQ78KR7xgFnJNRWc4TOEneM17ZsIOrhCP2v7J6kTlMnP+MZ1kHygu02Q184l97ipEuRwGZwkLawwwM8mQQ4vcBKq9zCpmkIdnGrfpuRNgp3hOMaqM5dB/5Jjg3QP6VF84Q3TbN6VcGwwxDHu0Mb7WrIVjoInXGKEOV5QC0fBGBeheiM4Co5wuBYcYNn0l/4CjcEyFV8I/vIAAAAASUVORK5CYII="), auto'
  },

  {
    icon: 'fa-eraser', name: 'eraser', hotKey: 'e', code: '\uf12d', tips: '橡皮(E)',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4T6XToUtDURTH8c8EwbpislgFkyzYDOsixtksBu37D4SBUW3CEAzC9ge4YjAMhsWo1aDdpOLkglcel713H7zTLvf8vud3zrm3pWG0GurlAJs4x0dJoZ8qwBoesVrlsgzQxgM2ci0uAizjDjs5MY5TQDhf4KiGeIB+CujjtIb4Fj18FwEHuK4hfsZW3EwEdDHBGW4Q5hDjE+sY4RUdvMXLAAi7fsK/rcTFEobY/av8UrwPgHfMsIevRFwc6jamaYshYY5L3GOlkBBgQXSCfYwXzSc6qHpth7gqG27uL2SX0hjwC6NKJS9S0OoxAAAAAElFTkSuQmCC"), auto'
  },

  {
    icon: 'fa-arrows', name: 'move', hotKey: 'm', code: '\uf047', tips: '位移(M)',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABI0lEQVQ4T43TsStGURgG8N+H2cJgFEpJWMRoUhYGZn+E9dswKotJIpOyk4FkYFAGK/VZTLIzIL1f5+jSvdd3p3PP+zzPec/zvKeh+uvFOfowg9cyaKOCn8nTqd6qEikT6MIF5v6IP2AS78X9MoHYW8UaJhJ4H7fYw+d/Ark+iKf0M4X7Og/ynbdxlIAjeCwRWMBO9iTaLRq2joNEGsVZWi/jLq1XsIW2sSFwWWJYTbq/Sq0QCHNyXJ0SM+45BAZwjSGcoIluDOM4IWPvFF9YxAZeMJtjzCLhwWEiVaWwhN0gR0rFOYhTixnXxdiDjzioapTnky+bqZtoOcy+Stf48apMINRvSoyN2Mbx1skkhifxHsYSuG1YYTJrO8jFLNJfRQ7gN3YgOwZiKOXiAAAAAElFTkSuQmCC"), auto'
  },

  {
    icon: 'fa-hand-rock-o', name: 'hand', hotKey: 'h', code: '\uf256', grab: '\uf255', tips: '拖动(H)',
    cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABcklEQVQ4T5XSzUtVcRDG8c+NkKgEg8paGC3cWBEI0TpIcuUbtChCiPAuImpREIJSQVF7QVepIELiy0YKWkVLU8QghSBaFfQH9ELQCzEyBy6Hq9LA4RzmN7/vmWeeqagfu3Efw3ncj+l6pZVSci+e4Fbmb+BwwiJ1GyP4U9wrAy5iAvdwEyfRjDks4iFOYWMrQNCPoxvR9gscxX6s4B2+4xGe42+5gwLQg8t4mYAmLOMtTuTf43zmfwCrGMQDPE1ItQAcwj5M4itqOziCAwjANYzlIENqXwCulCyaxaWcQehsQSPWcBWj+US+NwAx0Xks4BnWU/8e/EADfmEXIhdDLGa1CfiIKl6hPbs5Xet1nQUqAJsSptCJM/iULcd7uwjAT9wNwEG8wRecw+8dLseav065o4ULZxMyhMc7AMKR9+nUUu0eXE+Lzuc8tuK04gOOheRaQHzHzl9AFz6jvGjhwh10oA3fygXRXugLF7aLAYxHwT97FE0c0WkWQgAAAABJRU5ErkJggg=="), auto',
  // cursor: 'grab',
    grabbingCursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOklEQVQ4T6XTTyilYRTH8c8ttmpKMc2GGiV/FtRENkzNRpGk/IkNFrOzoSk7yk6zY0U2gyxtlIX8V66SUkoWkwWzmimFpIz01vvebm/vval7ds95er7POb/zOykFRqrA95IAH1CDYoygFDsI8lf4hf/Rx3HAR/zJquoeF2iO5TYwjctsQCW+YxAtGMYyrvET4xhDJypCYHUE6MJ6mFzDAHqwh3/4im30YxNl2EcGsIhnzOAHJrL7TBC6CodxwBnmMYlZvOSZ0GccxQFpLGAIq3jNA/iGlTigPOzx4R3emEIjuiMRv+AEx2jHXR5IEXYRiD2XPcaAeIrfaMLfHJBPuAm9kY4bqR7nOEBbDh0awlHWBp8kWbk1LLEPtwlV9KIDdXhKApRgC4EuuWIUS8Flvm0MQJmliZEeo/MbEns/XUt+c5UAAAAASUVORK5CYII="), auto'
  // grabCursor: 'grabbing'
  }
]