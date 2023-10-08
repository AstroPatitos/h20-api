import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WaterType } from '../enums/water-type.enum';

@Entity('waterBodies')
export class WaterBody {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  stationNumber: string;
  @Column('varchar')
  country: string;
  @Column({
    type: 'enum',
    enum: WaterType,
  })
  waterType: WaterType;
  @Column('varchar')
  description: string;
  @Column('int')
  elevation: number;
  @Column('varchar')
  latitude: string;
  @Column('varchar')
  longitude: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  zincDissolved: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  zincTotal: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  totalSuspendedSolids: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  totalColiforms: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  totalNitrogen: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  totalDissolvedSolids: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  waterTemperature: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  airTemperature: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  pH: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  dissolvedOxigen: string; //O2-Dissolved Oxigen
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  percentDissolvedOxigen: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  oxidizedNitrogen2: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  oxidizedNitrogen3: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  dissolvedMercury: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  totalMercury: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  fecalColiform: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  ecoli: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  chemicalOxygenDemand: string;
  //@Column({ type: 'decimal', precision: 10, scale: 2 })
  @Column('varchar')
  biochemicalOxigenDemand: string;
}
