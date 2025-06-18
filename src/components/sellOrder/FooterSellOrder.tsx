import "./FooterSellOrder.pcss"
interface FooterSellOrderProps {
  className?: string;
}
export default function FooterSellOrder({ className = "" }: FooterSellOrderProps) {
  return (
    <>
      <div className={"FooterSellOrder " + className}>
        <div className="notes text-sm">
          <p>NOTA: El pago de esta mercancía se puede recibir en Dólares Americanos USD o en Pesos Colombianos.</p>
          <p>NOTA: La condición de tiempo de pago máximo será de 7 días contínuos a partir de la fecha de recepción de esta nota de entrega. <b>LA FACTURA SE ELABORA AL  MOMENTO DEL PAGO</b></p>
        </div>

        <div className="companyInformation">
          <h2 className="text-md font-bold">Cuentas bancarias</h2>
          <div className="wrapper">
            <div>
              <p><b>Banco Mercantil</b></p>
              <p>Cuenta corriente 0105 0624 7116 2407 4383</p>
              <p>Nombre: Mantenimiento Industrial Productos CA.</p>
              <p>RIF J-30385897-0</p>
            </div>
            <div>
              <p><b>Banco de Venezuela</b></p>
              <p>Cuenta corriente 0102 0446 14 0000028503</p>
              <p>Nombre: Mantenimiento Industrial Productos CA.</p>
              <p>RIF. J 30385897 0</p>
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

      </div>
    </>
  )
}
