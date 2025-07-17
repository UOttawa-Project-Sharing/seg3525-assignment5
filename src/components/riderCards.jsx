import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { TrophyFill, AwardFill } from 'react-bootstrap-icons';

function RiderStatCard({
                           number,
                           name,
                           flagImage,
                           constructor,
                           points,
                           podiums,
                           riderImage,
                           bikeImage,
                           position
                       }) {
    return (
        <Card
            style={{
                width: 330,
                margin: '1rem auto',
                border: 'none',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.8)',
                boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)',
                backdropFilter: 'blur(8px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 148,
                    background: 'linear-gradient(90deg,#1e2838 20%, #3b4960 100%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
            >
                {bikeImage && (
                    <Image
                        src={bikeImage}
                        alt="Bike"
                        style={{
                            width: 260,
                            height: 104,
                            objectFit: 'contain',
                            opacity: 0.88,
                            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.18))',
                        }}
                    />
                )}
                {riderImage && (
                    <Image
                        src={riderImage}
                        alt={name}
                        style={{
                            position: 'absolute',
                            left: 26,
                            bottom: 0,
                            width: "auto",
                            height: "80%",
                        }}
                    />
                )}
                <span
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 20,
                        background: 'rgba(0,0,0,0.62)',
                        color: '#fff',
                        padding: '0.25em 0.7em',
                        fontWeight: 700,
                        fontSize: 28,
                        borderRadius: 15,
                        letterSpacing: 1,
                        boxShadow: '0 2px 8px #0002',
                    }}
                >
                    #{number}
                </span>
            </div>
            <Card.Body style={{ padding: '1.2rem 1.5rem 1.6rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: '#223', letterSpacing: 0.5 }}>{name}</span>
                    {flagImage && (
                        <Image
                            src={flagImage}
                            alt="Flag"
                            width={28}
                            height={21}
                            style={{ borderRadius: 3, border: '1px solid #ddd', boxShadow: '0 1px 3px #0001' }}
                        />
                    )}
                </div>
                <div style={{ fontSize: 15, color: '#3b4960', marginBottom: 14 }}>
                    <span style={{ fontWeight: 600 }}>Constructor:</span> {constructor}
                </div>
                <div style={{
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'space-between',
                    marginBottom: 6,
                }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(32,103,216,0.08)',
                            color: '#2067d8',
                            padding: '0.4em 1.1em',
                            borderRadius: 20,
                            fontWeight: 600,
                            fontSize: 16,
                            boxShadow: '0 1px 2px #2067d81a',
                        }}
                    >
                        <TrophyFill style={{ marginRight: 5 }} size={20} />
                        {points} pts
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(255,198,36,0.4)',
                            color: '#965400',
                            padding: '0.4em 1.1em',
                            borderRadius: 20,
                            fontWeight: 600,
                            fontSize: 16,
                            boxShadow: '0 1px 2px #f1a1001a',
                        }}
                    >
                        <AwardFill style={{ marginRight: 5 }} size={20} />
                        {podiums} podiums
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(36,198,255,0.4)',
                        color: '#004096',
                        padding: '0.4em 1.1em',
                        borderRadius: 20,
                        fontWeight: 600,
                        fontSize: 16,
                        boxShadow: '0 1px 2px #0078d81a',
                    }}
                >
                    <AwardFill style={{ marginRight: 5 }} size={20} />
                    Position: {position}
                </div>
            </Card.Body>
        </Card>
    );
}

export default RiderStatCard;