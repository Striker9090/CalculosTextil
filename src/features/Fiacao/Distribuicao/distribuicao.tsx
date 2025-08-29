/* import { Text, Layer, Rect, Stage } from "react-konva";

export function Distribuicao() {
  let dist = 5;
  type distribuiProps = {
    containerWidth:number;
    position: number;
  }

  const distribui = ({containerWidth, position} : distribuiProps) => {
    let array = [];
    const positionY = position;
    const sizeSquare = 50;
    const spacing = 3;

    // Largura total da distribuição
    const totalWidth = dist * sizeSquare + (dist - 1) * spacing;

    // Centralizar horizontalmente
    const positionX = (containerWidth - totalWidth) / 2;

    for (let i = 0; i < dist; i++) {
      const xPos = positionX + i * (sizeSquare + spacing);

      array.push(
        <Rect
          x={xPos}
          y={positionY}
          width={sizeSquare}
          height={sizeSquare}
          key={`rect-${i}`}
          fill="white"
        />
      );

      array.push(
        <Text
          x={xPos}
          y={positionY + sizeSquare / 2.5} // Ajuste vertical opcional
          width={sizeSquare}
          align="center"
          verticalAlign="middle"
          text="teste"
          fontSize={sizeSquare / 3}
          fill="black"
          key={`text-${i}`}
        />
      );
    }

    return array;
  };

  return (
    <>
      <Stage width={300} height={250}>
        <Layer>{distribui({containerWidth: 300, position: 20})}</Layer>
        <Layer>{distribui({containerWidth: 300, position: 100})}</Layer>
        <Layer>{distribui({containerWidth: 300, position: 180})}</Layer>
      </Stage>
    </>
  );
} */
