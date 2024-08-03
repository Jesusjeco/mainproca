import "./FooterSellOrder.pcss"
interface FooterSellOrderProps {
  className?: string;
}
export default function FooterSellOrder({ className = "" }: FooterSellOrderProps) {
  return (
    <>
      <div className={"FooterSellOrder " + className}>
        <div className="notes">
          <p>NOTA: El pago de esta mercancía se recibirá en Dólares Americanos USD o en Pesos Colombianos, tal y como se especifica en cada renglón recibido en su Descripción.</p>
          <b>NOTA: Pago en Bolívares a Tasa promedio entre el BCV y Monitor Dólar del momento de la transferencia.</b>
          <p>NOTA: La condición de tiempo de pago máximo será de 7 días contínuos a partir de la fecha de recepción de esta nota de entrega.</p>
        </div>

        <div className="clientData">
          <div>
            <div>RECIBIDO POR: </div><hr />
            <div>FIRMA: </div><hr />
            <div className="idAndDate">
              <div>C.I. </div><hr />
              <div>FECHA: </div><hr />
            </div>
          </div>
          <div className="stamp"><span>SELLO</span></div>
        </div>

        <div className="companyInformation">
          <h2 className="text-lg font-bold">Cuentas bancarias</h2>
          <div className="wrapper">
            <div>
              <p><b>Banco Mercantil</b></p>
              <p>Cuenta corriente 0105 0624 7116 2407 4383</p>
              <p>Nombre: Mantenimiento Industrial Productos CA.</p>
              <p>RIF J-30385897-0</p>
            </div>
            <div>
              <p><b>Pago Movil</b> (Enviar captura al mismo número de celular)</p>
              <p>Banco Mercantil</p>
              <p>Cédula: 5.656.032</p>
              <p>Teléfono: 04147076311</p>
            </div>
            <div>
              <p><b>Banco Mercatil Panamá</b></p>
              <p>Nombre: Jesús Carrero</p>
              <p>Cédula: 5.663.875</p>
              <p>Cuenta de ahorros. Número 420273956</p>
            </div>
            <div>
              <p><b>Zelle</b></p>
              <p>Nombre: Jesús Carrero</p>
              <p>Correo: jescar4@gmail.com</p>
            </div>
            <div className="contactWrapper">
              <div>
                <p>Ing. Jesús Ulises Carrero García</p>
                <p>+58 414 3764486</p>
                <p>jescar4@gmail.com</p>
              </div>
              <div>
                <p>Ing. Yadelsi Omaña de Carrero</p>
                <p>+58 414 7076311</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}