const aa = {
    a:1
}

const func = (arg) =>{
    arg.a = 2
    console.log(arg, aa)
}

func(aa)